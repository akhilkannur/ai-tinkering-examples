---
title: "How I Automated Instagram Direct Publishing (Without Paying for a Scheduler)"
date: "2026-02-05"
excerpt: "A step-by-step technical guide to building a custom Instagram auto-poster using Puppeteer, Cloudinary, and the Meta Graph API."
coverImage: "/images/blog/automated-video-with-remotion.png"
author:
  name: "Akhil Nair"
category: "Engineering"
---

# How I Automated Instagram Direct Publishing

Manually posting screenshots to Instagram is the biggest bottleneck for any "build-in-public" project. Today, I automated it. 

I wanted to take the 700+ AI blueprints on this site and post them daily as high-resolution 1:1 cards. Here is the exact technical workflow I used to bypass the "Invalid Platform" errors and expiring tokens of the Meta API.

---

## The Stack
- **Next.js (Edge Runtime):** For generating the 1080x1080 social cards.
- **Puppeteer:** To take high-quality screenshots of the cards.
- **Cloudinary:** To host the image (Instagram's API requires a public URL to fetch).
- **Meta Graph API:** For the actual publishing.

---

## Step 1: The "Bridge" Setup
Instagram's API doesn't talk to individual accounts. It talks to **Facebook Pages**.
1. **Instagram App:** Switch your account to a "Professional" or "Business" account.
2. **Facebook:** Create a placeholder Page (e.g., "Real AI Examples").
3. **Connect:** Link the Instagram account to the Facebook Page in the **[Meta Business Suite](https://business.facebook.com/)**.

---

## Step 2: The Meta Developer Portal
To get API access, you need an "App."
1. Go to **[Meta for Developers](https://developers.facebook.com/)**.
2. Create a new app (Select **Business** as the type).
3. Under **App Settings > Basic**, you MUST scroll to the bottom, click **Add Platform**, and select **Website**. Enter your URL (e.g., `https://realaiexamples.com`). 
   *   *Note: If you skip this, you will get the "Invalid Platform App" error in every login popup.*

---

## Step 3: The "System User" Workaround
Standard "User Tokens" expire in 60 days. To make this truly automated, you need a **System User Token** which doesn't expire automatically like standard user tokens.
1. Go to **[Business Settings](https://business.facebook.com/settings/)**.
2. **Users > System Users:** Create a new user called "Insta Bot" with **Admin** access.
3. **Add Assets:** Assign your **App**, your **Facebook Page**, and your **Instagram Account** to this system user.
4. **Generate Token:** Select your app and check these specific permissions:
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_read_engagement`
   - `pages_show_list`

---

## Step 4: Finding Your IDs
The API needs to know *which* account to post to. Use the **[Graph API Explorer](https://developers.facebook.com/tools/explorer/)** to find your ID.
1. Paste your System User Token into the Access Token field.
2. Run this query: `me/accounts?fields=instagram_business_account{id},name`
3. Look for the ID starting with `1784...`. This is your **Instagram Business Account ID**.

---

## Step 5: The Implementation
The script follow a 3-step handshake:
1. **Screenshot:** Use Puppeteer to hit a local URL (like `/api/og?format=insta`) and save the 1080x1080 card.
2. **Upload:** Send that image to Cloudinary.
3. **Publish:**
   - **Post to `/media`:** This creates a "container" using your Cloudinary URL and Caption.
   - **Post to `/media_publish`:** Once the container is ready, this command makes the post live.

---

## Conclusion
Direct publishing from your CLI is significantly more reliable than using third-party schedulers, and it gives you total control over the visual layout of your cards. 

By using the **System User** route, you avoid the headache of re-authenticating your app every two months. Now, every time I add a new blueprint to the site, it's just one command away from being an Instagram post.

**Useful Tools:**
- [Meta Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- [Cloudinary Image Upload API](https://cloudinary.com/documentation/image_upload_api_reference)
- [Puppeteer Documentation](https://pptr.dev/)
