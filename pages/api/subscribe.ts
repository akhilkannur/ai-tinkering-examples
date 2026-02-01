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
      fs.appendFileSync(path.join(process.cwd(), 'subscribe_debug.log'), 'RESEND_API_KEY is missing from process.env.\n');
    } catch (e) {
      console.error('RESEND_API_KEY is missing from process.env.');
    }
    return res.status(500).json({ error: 'Newsletter configuration missing (RESEND_API_KEY is not set in environment variables)' });
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
          subject: 'Welcome to the Lab (+ Your Blueprints)',
          reply_to: 'akhil@realaiexamples.com',
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px;">
              <p>Hey,</p>
              <p>Thanks for joining <strong>Real AI Examples</strong>. You're now part of the Lab.</p>
              
              <p>As promised, here are some <strong>free blueprints</strong> to get you started. These are files you can actually use in your workflows.</p>
              
              <div style="margin: 30px 0;">
                <a href="https://realaiexamples.com/ai-blueprints-starter-pack.zip" 
                   style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                   Download the Free Blueprints (ZIP)
                </a>
              </div>

              <p><strong>What to expect:</strong></p>
              <p>We send 3 emails a week. They contain actionable AI tactics and files (blueprints, CSVs, scripts) you can use. If they ever start to suck, just unsubscribe. I won't be offended.</p>

              <p>Happy tinkering,<br>
              <strong>Akhil</strong><br>
              <a href="https://realaiexamples.com" style="color: #666; text-decoration: none; font-size: 12px;">realaiexamples.com</a></p>
            </div>
          `

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

    