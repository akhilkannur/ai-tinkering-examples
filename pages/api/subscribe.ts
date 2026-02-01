import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = "2534c4c2-5093-451d-8504-1dbfc82e0d12"; // Website Email Subscribers

  if (!apiKey) {
    console.error('RESEND_API_KEY is missing.');
    return res.status(500).json({ error: 'Newsletter configuration missing' });
  }

  try {
    // 1. Add contact to Resend Audience
    const contactResponse = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email: email,
          unsubscribed: false,
        }),
      }
    );

    // If already exists, Resend returns 4xx, but we can proceed to send the email anyway
    if (!contactResponse.ok) {
      const contactData = await contactResponse.json();
      console.warn('Resend Contact Error (User might exist):', contactData);
    }

    // 2. Send Welcome Email with Lead Magnet
    const emailResponse = await fetch(
      'https://api.resend.com/emails',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: 'Akhil from Real AI Examples <akhil@mail.realaiexamples.com>',
          to: [email],
          subject: 'Welcome to Real AI Examples (+ Your Starter Pack)',
          reply_to: 'akhil@realaiexamples.com',
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px;">
              <p>Hey,</p>
              <p>Thanks for joining <strong>Real AI Examples</strong>. Every week, I share 3 real-world AI experiments you can copy-paste to automate your work.</p>
              <p>As a welcome gift, I've curated a <strong>Starter Pack of 50 AI Blueprints</strong> from our main library to help you automate your first few tasks.</p>
              
              <div style="margin: 30px 0;">
                <a href="https://realaiexamples.com/ai-blueprints-starter-pack.zip" 
                   style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                   Download the Starter Pack (ZIP)
                </a>
              </div>

              <p><strong>What's inside:</strong></p>
              <ul>
                <li>50 Automations: Simple workflows for email, content, and research.</li>
                <li>The Blueprint Guide: A quick walkthrough on how to run these with Claude, Gemini, or ChatGPT.</li>
              </ul>

              <p><strong>Want the full system?</strong></p>
              <p>This starter pack is just a sample. The full <strong>Real AI Examples Master Database</strong> contains 700+ advanced blueprints specifically for Sales Ops, SEO, and Revenue Engineering.</p>
              <p>You can check out the full library here:<br>
              <a href="https://realaiexamples.com/500-ways-to-use-llms-for-work" style="color: #F43F5E;">https://realaiexamples.com/500-ways-to-use-llms-for-work</a></p>

              <p>Happy tinkering,<br>
              <strong>Akhil</strong><br>
              Real AI Examples</p>
            </div>
          `,
        }),
      }
    );

    if (!emailResponse.ok) {
      const emailData = await emailResponse.json();
      console.error('Resend Email Error:', emailData);
      return res.status(500).json({ error: 'Failed to send welcome email' });
    }

    return res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
