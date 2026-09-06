import { ImageResponse } from 'next/og';

export const alt = 'Gokul Kannan — Digital Experience Designer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0A',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '72px 80px',
          color: '#FFFFFF',
        }}
      >
        {/* Header Branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
              }}
            />
            <span
              style={{
                fontSize: '20px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 600,
              }}
            >
              Available for Q3 & Q4 Selected Projects
            </span>
          </div>

          <div
            style={{
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '999px',
              padding: '8px 20px',
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 500,
            }}
          >
            gokulmakes.in
          </div>
        </div>

        {/* Center Hero Identity */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: '84px',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              color: '#F5F2ED',
            }}
          >
            GOKUL MAKES
          </div>
          <div
            style={{
              fontSize: '34px',
              fontWeight: 500,
              color: 'rgba(245, 242, 237, 0.85)',
              letterSpacing: '-0.02em',
            }}
          >
            Digital Experience Designer & Creative Technologist
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 400,
              color: 'rgba(245, 242, 237, 0.5)',
              marginTop: '4px',
            }}
          >
            Designing the Invisible. Building things people remember.
          </div>
        </div>

        {/* Footer Meta Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <span style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.65)' }}>
            UI/UX Design
          </span>
          <span style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
          <span style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.65)' }}>
            Creative Engineering
          </span>
          <span style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
          <span style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.65)' }}>
            Brand Identity
          </span>
          <span style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
          <span style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.65)' }}>
            Founder, Luno Tech
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
