import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

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

  // Log the attempt
  const logEntry = `${new Date().toISOString()} - Attempting to subscribe: ${email}\n`;
  try {
    fs.appendFileSync(path.join(process.cwd(), 'subscribe_debug.log'), logEntry);
  } catch (e) {
    console.log(logEntry);
  }

  if (!apiKey) {
    try {
      fs.appendFileSync(path.join(process.cwd(), 'subscribe_debug.log'), 'RESEND_API_KEY is missing.\n');
    } catch (e) {
      console.error('RESEND_API_KEY is missing.');
    }
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

    if (!contactResponse.ok) {
      try {
        const contactData = await contactResponse.json();
        try {
          fs.appendFileSync(path.join(process.cwd(), 'subscribe_debug.log'), `Resend Contact Error: ${JSON.stringify(contactData)}\n`);
        } catch (e) {
          console.warn('Resend Contact Error (User might exist):', contactData);
        }
      } catch (e) {
        try {
          fs.appendFileSync(path.join(process.cwd(), 'subscribe_debug.log'), `Resend Contact Error Status: ${contactResponse.status}\n`);
        } catch (e2) {
          console.warn('Resend Contact Error Status:', contactResponse.status);
        }
      }
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
          subject: 'Welcome to the Lab (+ Your AI Blueprints)',
          reply_to: 'akhil@realaiexamples.com',
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px;">
              <p>Hey,</p>
              <p>Thanks for joining <strong>Real AI Examples</strong>. You're now part of the Lab.</p>
              
              <p>As promised, here is your <strong>Starter Pack of 50 AI Blueprints</strong>. These are the same files I use to automate my own work.</p>
              
              <div style="margin: 30px 0;">
                <a href="https://realaiexamples.com/ai-blueprints-starter-pack.zip" 
                   style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                   Download the Starter Pack (ZIP)
                </a>
              </div>

              <p><strong>What to expect:</strong></p>
              <p>We send 3 emails a week. They contain files (blueprints, CSVs, scripts) you can actually use. If they ever start to suck, just unsubscribe. I won't be offended.</p>

              <p>In the meantime, if you want the full system, the <strong>Master Database</strong> contains 700+ advanced blueprints for Sales Ops, SEO, and Revenue Engineering:</p>
              <p><a href="https://realaiexamples.com/500-ways-to-use-llms-for-work" style="color: #F43F5E; font-weight: bold;">Browse the 700+ Master Database →</a></p>

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

          try {

            fs.appendFileSync(path.join(process.cwd(), 'subscribe_debug.log'), `Resend Email Error: ${JSON.stringify(emailData)}\n`);

          } catch (e) {

            console.error('Resend Email Error detail:', JSON.stringify(emailData, null, 2));

          }

          return res.status(emailResponse.status).json({ error: 'Failed to send welcome email', detail: emailData });

        }

    

        try {

          fs.appendFileSync(path.join(process.cwd(), 'subscribe_debug.log'), `Success for: ${email}\n`);

        } catch (e) {

          console.log(`Success for: ${email}`);

        }

        return res.status(201).json({ message: 'Subscribed successfully' });

      } catch (error: any) {

        try {

          fs.appendFileSync(path.join(process.cwd(), 'subscribe_debug.log'), `Catch Error: ${error.message}\n`);

        } catch (e) {

          console.error('Subscription catch error:', error);

        }

        return res.status(500).json({ error: 'Internal server error' });

      }

    }

    