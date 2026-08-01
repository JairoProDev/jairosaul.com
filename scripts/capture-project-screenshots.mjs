#!/usr/bin/env node
/**
 * Capture project screenshots for portfolio covers.
 *
 * Usage:
 *   node scripts/capture-project-screenshots.mjs
 *   node scripts/capture-project-screenshots.mjs --placeholders-only
 *
 * Requires: playwright (npx playwright install chromium) for live captures.
 * Always generates gradient placeholders first; live URLs overwrite when reachable.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const projectsDir = path.join(root, 'src/content/projects');
const outDir = path.join(root, 'public/images/projects');
const placeholdersOnly = process.argv.includes('--placeholders-only');

fs.mkdirSync(outDir, { recursive: true });

function loadProjects() {
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const { data } = matter(fs.readFileSync(path.join(projectsDir, file), 'utf8'));
      return {
        slug,
        title: data.title || slug,
        liveUrl: data.liveUrl,
        coverImage: data.coverImage || `/images/projects/${slug}.webp`,
        category: data.category || 'product',
      };
    });
}

const palette = {
  startup: ['#0f172a', '#1d4ed8'],
  product: ['#0f172a', '#059669'],
  client: ['#0f172a', '#d97706'],
  mobile: ['#0f172a', '#7c3aed'],
  tool: ['#0f172a', '#0891b2'],
  experiment: ['#0f172a', '#be123c'],
};

async function writePlaceholder(project) {
  const [from, to] = palette[project.category] || palette.product;
  const title = project.title.replace(/[<>&]/g, '');
  const svg = `
<svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#g)"/>
  <circle cx="1040" cy="160" r="180" fill="rgba(255,255,255,0.06)"/>
  <circle cx="180" cy="560" r="220" fill="rgba(255,255,255,0.05)"/>
  <text x="80" y="320" fill="rgba(255,255,255,0.45)" font-family="Georgia, serif" font-size="28">JairoSaul · Projects</text>
  <text x="80" y="400" fill="#f8fafc" font-family="Georgia, serif" font-size="64" font-weight="700">${title}</text>
</svg>`;
  const outPath = path.join(outDir, `${project.slug}.webp`);
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(outPath);
  return outPath;
}

async function captureLive(project) {
  if (!project.liveUrl) return false;
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    console.warn('playwright not installed — skipping live captures (placeholders kept)');
    return false;
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    await page.goto(project.liveUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(1500);
    const buf = await page.screenshot({ type: 'png', fullPage: false });
    const outPath = path.join(outDir, `${project.slug}.webp`);
    await sharp(buf).resize(1280, 720, { fit: 'cover' }).webp({ quality: 84 }).toFile(outPath);
    console.log(`✓ live  ${project.slug}`);
    return true;
  } catch (err) {
    console.warn(`✗ live  ${project.slug}: ${err.message}`);
    return false;
  } finally {
    await browser.close();
  }
}

async function main() {
  const projects = loadProjects();
  console.log(`Generating covers for ${projects.length} projects...`);

  for (const project of projects) {
    await writePlaceholder(project);
    console.log(`· placeholder ${project.slug}`);
  }

  if (placeholdersOnly) {
    console.log('Done (placeholders only).');
    return;
  }

  const withUrl = projects.filter((p) => p.liveUrl);
  for (const project of withUrl) {
    await captureLive(project);
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
