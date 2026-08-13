import { ImageResponse } from 'next/og';
import { PAGE_TITLE } from '@/lib/peru-grand-travel';

export const alt = PAGE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0f172a',
          padding: '64px 72px',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, #3b82f6, #22c55e, #a855f7)',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: '#93c5fd',
              letterSpacing: 3,
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
            }}
          >
            Entregable · jairosaul.com
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              color: '#f8fafc',
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            Auditoría SEO Técnica
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 36,
              color: '#cbd5e1',
            }}
          >
            Peru Grand Travel
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 16,
              fontFamily: 'sans-serif',
              fontSize: 22,
              color: '#e2e8f0',
            }}
          >
            <div
              style={{
                display: 'flex',
                padding: '10px 18px',
                border: '1px solid #334155',
                borderRadius: 999,
                background: '#1e293b',
              }}
            >
              3 dominios
            </div>
            <div
              style={{
                display: 'flex',
                padding: '10px 18px',
                border: '1px solid #7f1d1d',
                borderRadius: 999,
                background: '#450a0a',
                color: '#fecaca',
              }}
            >
              5 hallazgos
            </div>
            <div
              style={{
                display: 'flex',
                padding: '10px 18px',
                border: '1px solid #334155',
                borderRadius: 999,
                background: '#1e293b',
              }}
            >
              EN · ES · PT
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              color: '#94a3b8',
              fontFamily: 'sans-serif',
              fontSize: 22,
            }}
          >
            <div style={{ color: '#f8fafc' }}>Jairo · Cusco</div>
            <div>9 de agosto de 2026</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
