export type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Pull h2/h3 from MDX, ignoring fenced code. */
export function extractHeadings(source: string): Heading[] {
  const withoutCode = source.replace(/```[\s\S]*?```/g, '');
  const headings: Heading[] = [];
  const re = /^(#{2,3})\s+(.+?)\s*$/gm;
  let match: RegExpExecArray | null;

  while ((match = re.exec(withoutCode)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`]/g, '').trim();
    if (!text) continue;
    headings.push({ id: slugifyHeading(text), text, level });
  }

  return headings;
}

export { slugifyHeading };
