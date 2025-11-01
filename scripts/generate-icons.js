const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputSvg = path.join(__dirname, '../public/brain-icon.svg');
const outputDir = path.join(__dirname, '../public/icons');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  console.log('Generating PWA icons from SVG...');

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);

    try {
      await sharp(inputSvg)
        .resize(size, size)
        .png()
        .toFile(outputPath);

      console.log(`✓ Generated icon-${size}x${size}.png`);
    } catch (error) {
      console.error(`✗ Failed to generate icon-${size}x${size}.png:`, error.message);
    }
  }

  // Generate favicon sizes (16x16, 32x32, 48x48)
  const faviconSizes = [16, 32, 48];
  const faviconDir = path.join(__dirname, '../public');

  for (const size of faviconSizes) {
    const outputPath = path.join(faviconDir, `favicon-${size}x${size}.png`);

    try {
      await sharp(inputSvg)
        .resize(size, size)
        .png()
        .toFile(outputPath);

      console.log(`✓ Generated favicon-${size}x${size}.png`);
    } catch (error) {
      console.error(`✗ Failed to generate favicon-${size}x${size}.png:`, error.message);
    }
  }

  console.log('\n✅ All icons generated successfully!');
}

generateIcons().catch(console.error);
