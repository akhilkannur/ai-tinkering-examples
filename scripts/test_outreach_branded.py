import json
import subprocess
import os
import re
from datetime import datetime

# Load API Key
if not os.environ.get("RESEND_API_KEY"):
    try:
        with open('.env', 'r') as f:
            for line in f:
                line = line.strip()
                if line.startswith('RESEND_API_KEY='):
                    os.environ["RESEND_API_KEY"] = line.split('=', 1)[1].strip().strip('"').strip("'")
                    break
    except Exception: pass

API_KEY = os.environ.get("RESEND_API_KEY")
MY_EMAIL = "akhilnairmk@gmail.com"

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'\s+', '-', text)
    text = re.sub(r'\.', '-', text)
    text = re.sub(r'[^\w\-]+', '', text)
    text = re.sub(r'\-\-+', '-', text)
    return text

def send_test_email(tool_name):
    subject = f"[BRANDED TEST] {tool_name} is live + an honest favor"
    slug = slugify(tool_name)
    tool_url = f"https://realaiexamples.com/tools/{slug}?utm_source=email&utm_medium=acceptance_notification&utm_campaign=badge_requirement"
    badge_url = "https://realaiexamples.com/tools/badge"
    clean_url = f"realaiexamples.com/tools/{slug}"
    
    # Generate the personalized embed code
    embed_target = f"https://realaiexamples.com/tools/{slug}?utm_source=badge&utm_medium=embed&utm_campaign=featured"
    embed_img = "https://realaiexamples.com/images/badge-dark.svg"
    embed_code = f'<a href="{embed_target}" target="_blank"><img src="{embed_img}" alt="Featured on REAL AI EXAMPLES" width="220" height="50" /></a>'

    html_body = f"""<div style="background-color: #f9fafb; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
    
    <!-- Header/Branding -->
    <div style="padding: 32px 40px; border-bottom: 1px solid #f3f4f6;">
        <a href="https://realaiexamples.com" style="text-decoration: none; display: flex; align-items: center;">
            <img src="https://realaiexamples.com/logo-square.png" alt="Real AI Examples" width="32" height="32" style="border-radius: 4px; border: 1px solid #e5e7eb;">
            <span style="margin-left: 12px; font-size: 20px; font-weight: 800; color: #111827; letter-spacing: -0.025em;">Real AI Examples</span>
        </a>
    </div>

    <!-- Body -->
    <div style="padding: 40px; line-height: 1.6; color: #374151; font-size: 16px;">
        <p style="margin-top: 0; margin-bottom: 24px;">Hey,</p>
        
        <p style="margin-bottom: 24px;">Just letting you know I’ve added <strong>{tool_name}</strong> to the directory on Real AI Examples. You can see your listing here: <a href="{tool_url}" style="color: #064e3b; font-weight: 600; text-decoration: underline;">{clean_url}</a></p>

        <p style="margin-bottom: 24px;">When I added a tool directory to the site, I just added tools for free so makers could "submit and forget" while I did the rest. But I've realized that for this to actually be useful to everyone, we need to trade some authority.</p>

        <p style="margin-bottom: 32px;">I’m moving to a "Verified" model where free listings include a "Featured" badge (or a simple backlink) in exchange for the listing. A few new makers have already done this, and I’m expecting a significant DR boost for the whole directory in the coming weeks as a result.</p>

        <!-- Action Box -->
        <div style="margin-bottom: 32px; padding: 32px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px;">
            <p style="margin-top: 0; margin-bottom: 8px; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #166534;">⚠️ Action Required</p>
            <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 18px; font-weight: 700; color: #064e3b;">Add Badge or Link by May 20th</h3>
            <p style="margin-bottom: 20px; font-size: 15px; color: #166534;">To keep your backlink active, please copy and embed this personalized badge code on your site:</p>

            <div style="background: #ffffff; padding: 16px; border: 1px solid #bbf7d0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; color: #374151; word-break: break-all; margin-bottom: 20px; border-radius: 4px; line-height: 1.4;">
                {embed_code.replace('<', '&lt;').replace('>', '&gt;')}
            </div>

            <a href="{badge_url}" style="display: inline-block; font-size: 14px; color: #166534; font-weight: 700; text-decoration: underline;">Need a light variant or different size? Click here →</a>
        </div>

        <p style="margin-bottom: 24px;">If you don't want to use the badge, a simple text link anywhere on your site (like a footer or "As Seen In" section) works too. You can just link the text "Featured on Real AI Examples" to your listing page. It only takes a minute but ensures we all get the SEO benefit from each other's efforts.</p>

        <p style="margin-bottom: 0;">Best,<br>
        <strong>Akhil</strong><br>
        <span style="color: #6b7280; font-size: 14px;">Founder, RealAiExamples</span></p>
    </div>

    <!-- Footer -->
    <div style="padding: 32px 40px; background-color: #f9fafb; border-top: 1px solid #f3f4f6; text-align: center;">
        <p style="margin-top: 0; margin-bottom: 16px; font-size: 14px; color: #6b7280;">
            How People Actually Use AI at Work.
        </p>
        <p style="margin-bottom: 0; font-size: 12px; color: #9ca3af;">
            You're receiving this because you submitted a tool to Real AI Examples.
        </p>
    </div>
</div>
</div>"""

    payload = {
        "from": "akhil@mail.realaiexamples.com",
        "to": [MY_EMAIL],
        "reply_to": "akhil@realaiexamples.com",
        "subject": subject,
        "html": html_body
    }

    cmd = [
        "curl", "-s", "-X", "POST", "https://api.resend.com/emails",
        "-H", f"Authorization: Bearer {API_KEY}",
        "-H", "Content-Type: application/json",
        "-d", json.dumps(payload)
    ]

    print(f"Sending BRANDED TEST for {tool_name} to {MY_EMAIL}...")
    subprocess.run(cmd)

if __name__ == "__main__":
    send_test_email("Borrowing Calculator")
