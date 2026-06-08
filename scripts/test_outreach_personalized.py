import json
import subprocess
import os
import re

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
    subject = f"[TEST V2] {tool_name} is live + an honest favor"
    slug = slugify(tool_name)
    tool_url = f"https://realaiexamples.com/tools/{slug}?utm_source=email&utm_medium=test"
    badge_url = "https://realaiexamples.com/tools/badge"
    clean_url = f"realaiexamples.com/tools/{slug}"
    
    # Generate the personalized embed code
    # We use &amp; for HTML safety in the pre tag
    embed_target = f"https://realaiexamples.com/tools/{slug}?utm_source=badge&amp;utm_medium=embed&amp;utm_campaign=featured"
    embed_img = "https://realaiexamples.com/images/badge-dark.svg"
    embed_code = f'<a href="{embed_target}" target="_blank"><img src="{embed_img}" alt="Featured on REAL AI EXAMPLES" width="220" height="50" /></a>'

    html_body = f"""<div style="font-family: sans-serif; line-height: 1.5; color: #333; max-width: 600px;">
<p>Hey,</p>
<p>Just letting you know I’ve added <strong>{tool_name}</strong> to the directory on Real AI Examples. You can see your listing here: <a href="{tool_url}" style="color: #007bff; text-decoration: none;">{clean_url}</a></p>

<p>When I started this site, I just added tools for free so makers could "submit and forget" while I did the rest. But I've realized that for this to actually be useful to everyone, we need to trade some authority.</p>

<p>I’m moving to a "Verified" model where free listings include a "Featured" badge (or a simple backlink) in exchange for the listing. A few new makers have already done this, and I’m expecting a significant DR boost for the whole directory in the coming weeks as a result.</p>

<div style="margin: 20px 0; padding: 24px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px;">
<p style="margin-top: 0; font-weight: bold; color: #166534;">⚠️ Action: Add Badge or Link by May 20th</p>
<p style="font-size: 14px; margin-bottom: 15px; color: #166534;">To keep your backlink active, please copy and embed this personalized badge code on your site:</p>

<div style="background: #ffffff; padding: 12px; border: 1px solid #bbf7d0; font-family: monospace; font-size: 11px; color: #333; word-break: break-all; margin-bottom: 15px;">
{embed_code.replace('<', '&lt;').replace('>', '&gt;')}
</div>

<p style="margin-bottom: 0; font-size: 13px;"><a href="{badge_url}" style="color: #166534; font-weight: bold; text-decoration: underline;">Need a light variant or different size? Click here →</a></p>
</div>

<p style="font-size: 14px;">If you don't want to use the badge, a simple text link anywhere on your site works too. It only takes a minute but ensures we all get the SEO benefit from each other's efforts.</p>

<p>Best,<br>
<strong>Akhil</strong></p>

<p style="font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 15px; margin-top: 25px;">
<strong>P.S.</strong> If you have any suggestions or edits for your listing, just reply to this email and I’ll get it updated for you.
</p>
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

    print(f"Sending Personalized TEST for {tool_name} to {MY_EMAIL}...")
    subprocess.run(cmd)

if __name__ == "__main__":
    send_test_email("Borrowing Calculator")
