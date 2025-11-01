const sharp = require('sharp');
const path = require('path');

const width = 1200;
const height = 630;
const outputPath = path.join(__dirname, '../public/images/og-image.jpg');

async function generateOGImage() {
  console.log('Generating Open Graph image...');

  // Create gradient background
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#1e293b;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#334155;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="glow1" cx="20%" cy="30%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:transparent;stop-opacity:0" />
        </radialGradient>
        <radialGradient id="glow2" cx="80%" cy="70%">
          <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.2" />
          <stop offset="100%" style="stop-color:transparent;stop-opacity:0" />
        </radialGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#grad1)"/>
      <rect width="${width}" height="${height}" fill="url(#glow1)"/>
      <rect width="${width}" height="${height}" fill="url(#glow2)"/>

      <!-- Grid pattern -->
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" stroke-width="0.5" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grid)"/>

      <!-- Brain icon (large) -->
      <g transform="translate(100, 180)">
        <path d="M80 20 C50 20 30 40 30 70 C30 80 32 88 36 95 L42 105 L46 120 L50 130 L60 140 L80 145 L100 140 L110 130 L114 120 L118 105 L124 95 C128 88 130 80 130 70 C130 40 110 20 80 20 Z"
              fill="url(#brainGradient)"
              stroke="#1e40af"
              stroke-width="3"
              opacity="0.8"/>
        <defs>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M50 60 Q60 55 70 60 T90 60" stroke="#1e40af" stroke-width="3" fill="none" opacity="0.6"/>
        <path d="M52 75 Q62 70 72 75 T92 75" stroke="#1e40af" stroke-width="3" fill="none" opacity="0.6"/>
        <path d="M54 90 Q64 85 74 90 T94 90" stroke="#1e40af" stroke-width="3" fill="none" opacity="0.6"/>
      </g>

      <!-- Main title -->
      <text x="400" y="220"
            font-family="Inter, system-ui, sans-serif"
            font-size="72"
            font-weight="700"
            fill="#ffffff">
        Jairo Saul
      </text>
      <text x="400" y="290"
            font-family="Inter, system-ui, sans-serif"
            font-size="72"
            font-weight="700"
            fill="#ffffff">
        Salas Quiñones
      </text>

      <!-- Subtitle -->
      <text x="400" y="360"
            font-family="Inter, system-ui, sans-serif"
            font-size="32"
            font-weight="500"
            fill="#3b82f6">
        Startup Technical Founder
      </text>

      <!-- Tags -->
      <text x="400" y="430"
            font-family="Inter, system-ui, sans-serif"
            font-size="24"
            font-weight="400"
            fill="#94a3b8">
        FullStack Engineer • Business Developer
      </text>
      <text x="400" y="470"
            font-family="Inter, system-ui, sans-serif"
            font-size="24"
            font-weight="400"
            fill="#94a3b8">
        Scientific Content Creator
      </text>

      <!-- Bottom accent -->
      <rect x="400" y="520" width="600" height="4" fill="#10b981" rx="2"/>

      <!-- Domain -->
      <text x="400" y="570"
            font-family="Inter, system-ui, sans-serif"
            font-size="28"
            font-weight="600"
            fill="#10b981">
        jairosaul.com
      </text>
    </svg>
  `;

  try {
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    console.log('✅ Open Graph image generated successfully!');
  } catch (error) {
    console.error('✗ Failed to generate OG image:', error.message);
  }
}

generateOGImage().catch(console.error);
