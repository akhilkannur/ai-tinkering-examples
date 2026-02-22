# Dodo Payments Setup for Master Skills

## ✅ What's Configured

Your download API is already set up with:
- Product ID: `H8Dq5SsZez55ciRh.oQxh6KivD4IKCwg0ZNa00En53kQDKIPfxuyRu3izJ5p_qwoT`
- Dodo Payments validation
- Automatic order verification

---

## 🔧 Setup Steps

### 1. Get Your Dodo API Key

1. Log into [Dodo Payments Dashboard](https://dashboard.dopayments.com/)
2. Go to **Settings** → **API Keys**
3. Copy your **Secret Key**

### 2. Add to .env.local

Create or edit `.env.local` in your project root:

```bash
DODO_PAYMENTS_API_KEY=your_secret_key_here
```

**Important:** 
- `.env.local` is gitignored (never commit)
- Restart your dev server after adding

### 3. Test the Download

```bash
# Start your server
npm run dev

# Test with a fake order (works without API key)
curl "http://localhost:3000/api/download-skills?order=test123" --output test.zip

# Should download a ZIP file
unzip -l test.zip

# Should show:
# real-ai-examples-master-skills.zip
# ├── sales-ops.md
# ├── marketing-ops.md
# ├── seo-content.md
# ├── revops-strategy.md
# ├── automation-dev.md
# ├── install.sh
# └── install.bat
```

---

## 📧 Update Dodo Checkout

### In Dodo Dashboard:

1. Go to your product: `H8Dq5SsZez55ciRh.oQxh6KivD4IKCwg0ZNa00En53kQDKIPfxuyRu3izJ5p_qwoT`
2. Settings → Checkout → Success Message
3. Paste this:

```
Thank you for your purchase!

Your 5 Master Skills are ready to download.

Download Link:
https://realaiexamples.com/api/download-skills?order={{order_id}}

Click the link above to download your ZIP file with all 5 skills + install scripts.

Installation takes 2 minutes:
1. Download and extract the ZIP
2. Run install.sh (Mac/Linux) or install.bat (Windows)
3. All files are copied to the correct folder automatically

Check your inbox for a separate email from akhil@realaiexamples.com with detailed install instructions and usage examples.

Questions? Reply to that email or reach out at akhil@realaiexamples.com

Happy building!
— Akhil
```

### Email Notification:

1. Go to **Emails** → **Confirmation Email**
2. Edit the template
3. Paste the email from `/email-templates/master-skills-onboarding.md`
4. Make sure the download link uses `{{order_id}}` variable

---

## 🔒 How Validation Works

```
Customer clicks download link
    ↓
API receives order ID
    ↓
Calls Dodo API: GET /orders/{order_id}
    ↓
Checks:
1. Order exists ✓
2. Status is "paid" or "completed" ✓
3. Product ID matches ✓
    ↓
All checks pass → Stream ZIP file
Any check fails → Return 403 error
```

---

## 🧪 Testing

### Without API Key (Development)

If `DODO_PAYMENTS_API_KEY` is not set:
- All downloads are allowed (for testing)
- Console shows warning message
- **Remove before production!**

### With API Key (Production)

Once you add the key:
- Only valid Dodo orders can download
- Invalid orders get 403 error
- All validation logged to console

---

## 📊 Order Variables in Dodo

Use these in your success page / emails:

| Variable | Example | Description |
|----------|---------|-------------|
| `{{order_id}}` | `ord_abc123` | Unique order ID |
| `{{customer_email}}` | `user@example.com` | Customer's email |
| `{{product_name}}` | `Master Skills` | Product name |
| `{{amount}}` | `39.00` | Amount paid |

---

## ❓ Troubleshooting

### "Invalid or expired access token"

- Order ID is invalid
- Order not paid yet
- Wrong product

Check Dodo dashboard for the order status.

### Download returns 404

- API endpoint not deployed
- Server not running

Check: `https://realaiexamples.com/api/download-skills?order=test123`

### ZIP is empty

- Files missing from `/master-skills-private/`
- Check file permissions

---

## 🚀 Ready to Launch?

1. ✅ API endpoint created
2. ✅ Product ID configured
3. ✅ Install scripts ready
4. ✅ Email templates written
5. ⏳ Add Dodo API key to `.env.local`
6. ⏳ Update Dodo checkout success message
7. ⏳ Test with a real purchase

**Once you add the API key and update Dodo, you're live!**

---

## Support Files

| File | Purpose |
|------|---------|
| `/pages/api/download-skills.ts` | Download API with Dodo validation |
| `/email-templates/master-skills-onboarding.md` | Customer emails |
| `/master-skills-private/` | The 5 skill files + installers |
| `/.env.example` | Environment variables template |

---

Questions? Check the API code comments or test with a fake order first.
