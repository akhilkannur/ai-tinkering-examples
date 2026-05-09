import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = req.headers['x-webhook-secret'] || req.query.secret;
  if (secret !== process.env.FORM_WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { email, toolName } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
  }

  const name = toolName || 'your tool';

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
      <h1 style="font-size: 22px; font-weight: 700; margin-bottom: 16px;">Thanks for submitting ${name}!</h1>
      
      <p style="font-size: 15px; line-height: 1.7; color: #444;">We review every submission manually. Yours will be reviewed within <strong>7 days</strong>.</p>
      
      <p style="font-size: 15px; line-height: 1.7; color: #444;">If approved, you'll get:</p>
      <ul style="font-size: 15px; line-height: 1.9; color: #444; padding-left: 20px;">
        <li>A permanent listing on <a href="https://realaiexamples.com/tools" style="color: #064e3b; font-weight: 600;">realaiexamples.com/tools</a></li>
        <li>A do-follow SEO backlink</li>
        <li>Inclusion in our next Weekly Drop</li>
      </ul>

      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 28px 0;" />

      <h2 style="font-size: 17px; font-weight: 700; margin-bottom: 12px;">Want priority review? Add our badge.</h2>
      <p style="font-size: 14px; line-height: 1.7; color: #555;">Tools with the badge get fast-tracked to the top of our review queue.</p>
      
      <div style="text-align: center; margin: 24px 0;">
        <a href="https://realaiexamples.com/tools/badge">
          <img src="https://realaiexamples.com/images/badge-dark.svg" alt="Featured on REAL AI EXAMPLES" width="220" height="50" style="display: inline-block;" />
        </a>
      </div>
      
      <p style="text-align: center;">
        <a href="https://realaiexamples.com/tools/badge" style="display: inline-block; background: #064e3b; color: white; padding: 12px 28px; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.05em; text-transform: uppercase; border-radius: 2px;">Get the Badge</a>
      </p>

      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 28px 0;" />
      
      <p style="font-size: 13px; color: #999;">Akhil from Real AI Examples</p>
    </div>
  `;

  try {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Akhil from Real AI Examples <akhil@mail.realaiexamples.com>',
        to: [email],
        subject: `We got your submission — ${name}`,
        reply_to: 'akhil@realaiexamples.com',
        html: htmlBody,
      }),
    });

    if (!emailResponse.ok) {
      const data = await emailResponse.json();
      console.error('Resend error:', data);
      return res.status(emailResponse.status).json({ error: 'Failed to send email', detail: data });
    }

    return res.status(200).json({ message: 'Email sent' });
  } catch (error: any) {
    console.error('Form submission email error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
