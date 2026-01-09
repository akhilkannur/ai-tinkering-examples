import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const title = searchParams.get('title') || 'AI Agent Blueprint';
    const category = searchParams.get('category') || 'Automation';
    const tagline = searchParams.get('tagline') || 'Build better workflows with AI.';

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
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '8px 20px',
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
                fontSize: '72px',
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
                fontSize: '32px',
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
                  fontSize: '24px',
                  color: '#3b82f6',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                }}
              >
                realaiexamples.com
              </div>
            </div>
            <div
              style={{
                fontSize: '20px',
                color: '#475569',
              }}
            >
              Terminal Cookbook Blueprint
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
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
