import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const mode = searchParams.get('mode');
    const format = searchParams.get('format');
    
    // Default values for homepage
    let title = searchParams.get('title') || 'AI Blueprints';
    let category = searchParams.get('category') || 'Work Automation';
    let tagline = searchParams.get('tagline') || 'Copy, Paste, Automate Your Work.';
    let siteName = 'realaiexamples.com';
    let bottomLabel = 'The Work Automation Library';

    // Instagram format (1080x1080)
    if (format === 'insta') {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              backgroundColor: '#0f172a',
              backgroundImage: 'radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)',
              backgroundSize: '40px 40px',
              padding: '100px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#D4FF00',
                  color: '#0f172a',
                  padding: '12px 32px',
                  borderRadius: '100px',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {category}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '20px',
              }}
            >
              <div
                style={{
                  fontSize: '110px',
                  fontWeight: 'bold',
                  color: 'white',
                  lineHeight: 1.0,
                  marginBottom: '40px',
                  width: '880px',
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontSize: '48px',
                  color: '#94a3b8',
                  width: '880px',
                  lineHeight: 1.4,
                }}
              >
                {tagline}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 'auto',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '42px',
                    color: '#D4FF00',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                  }}
                >
                  {siteName}
                </div>
              </div>
              <div
                style={{
                  fontSize: '28px',
                  color: '#475569',
                  fontWeight: '600',
                }}
              >
                Agent Blueprint
              </div>
            </div>
          </div>
        ),
        {
          width: 1080,
          height: 1080,
        },
      );
    }

    // If it's a blueprint page, we use the passed params or defaults
    if (mode !== 'home' && searchParams.has('title')) {
        bottomLabel = 'Real AI Examples Blueprint';
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            backgroundImage: 'radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)',
            backgroundSize: '40px 40px',
            padding: '80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: '#D4FF00', // Our brand accent color (Electric Lime/Yellow)
                color: '#0f172a',
                padding: '8px 24px',
                borderRadius: '100px',
                fontSize: '24px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {category}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                fontSize: '84px',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.1,
                marginBottom: '30px',
                width: '900px',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '36px',
                color: '#94a3b8',
                width: '800px',
                lineHeight: 1.4,
              }}
            >
              {tagline}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 'auto',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '28px',
                  color: '#D4FF00',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                }}
              >
                {siteName}
              </div>
            </div>
            <div
              style={{
                fontSize: '22px',
                color: '#475569',
                fontWeight: '600',
              }}
            >
              {bottomLabel}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}