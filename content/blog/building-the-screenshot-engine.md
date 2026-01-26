---
title: "I Built a Headless Scraper That 'Fixes Itself' (Because I'm Lazy)"
date: "2026-01-23"
excerpt: "Maintaining 500+ screenshots is boring. I'm not a coder, so I 'hired' an AI agent to build a system that does the grunt work for me. Here's the messy truth of how it works."
coverImage: "/images/blog/screenshot-engine.png"
author: "Akhil Nair"
category: "Engineering"
---

I hit a wall with this project last week.

When I started, manually taking screenshots of 50 AI tools was fine. I’d visit the site, hit Command+Shift+4, crop it, save it. Whatever.

But then the list grew to 500+.
Links started rotting. Designs changed. My beautiful grid of cards started looking like a mess of broken images and 404 errors.

I had two options:
1. Hire a VA to click buttons for 10 hours a week.
2. Build a robot to do it.

The problem? **I’m not a developer.** I know enough to break things, but if you asked me to write a Puppeteer script from scratch, I’d stare at the screen until my eyes bled.

So, I cheated. I acted like a Product Manager and made the AI do the heavy lifting.

## The "Employee" (Puppeteer)

I knew *what* I needed: a headless browser (basically Chrome without the window) that visits a link and snaps a picture.

I didn't know the syntax. So I just told the Gemini CLI:
> *"I need a script that visits a URL. If it's a Twitter link, I want you to crop it to just the tweet text. If it's a website, take a full viewport shot. Oh, and add a cool Mac-style window shadow to it so it looks professional."*

I didn't talk about DOM selectors or `await page.evaluate()`. I just described the result.

The AI spat out a file called `capture-screenshot.js`. I ran it. It crashed.
I pasted the error back into the AI. It fixed it.

## The "Smart" Part

The coolest part isn't that it takes screenshots. It's that the AI figured out the *cropping*.

I don't know how to inspect HTML elements to find the exact "div" class for a tweet. But the AI does. It wrote a config that looks for specific CSS classes on Twitter, LinkedIn, and GitHub to frame the shot perfectly.

```javascript
// I didn't write this. The AI figured out Twitter's layout.
twitter: { x: 150, y: 50, width: 900, height: 600 }
```

## The Truth About "No-Code"

People think "No-Code" means using drag-and-drop builders.
I think "No-Code" is just "Code-by-Voice."

I have a folder on my computer right now full of Javascript files I barely understand. They run every night. They check for dead links, snap new photos, and update this website.

I didn't learn Javascript. I just learned how to ask for what I want until the computer gave it to me.

If you're manually doing *anything* on your computer more than three times a week, you're doing it wrong. Just ask the AI to write you a script.
