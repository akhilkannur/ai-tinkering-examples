---
title: "The Hidden 'Backdoor' I Built for Free AI Traffic"
date: "2026-01-23"
excerpt: "Robots are reading your website. If you don't roll out the red carpet for them, they'll ignore you. Here's how I added a simple text file to get AI agents to recommend me."
coverImage: "/images/blog/llms-txt-explained.png"
author:
  name: "Akhil from Real Examples"
category: "Future of Web"
---

Let's be real: I want traffic.

I spend hours trying to rank on Google. But lately, I’ve noticed I’m doing fewer Google searches myself.
I’m just asking Claude or Gemini.

> *"What's the best tool for cold email?"*
> *"Give me a checklist for a product launch."*

If the AI answers those questions, **I want it to mention my site.**

But here’s the problem: Modern websites are full of junk. Popups, cookie banners, complex layouts. To an AI robot trying to read your content, your beautiful website looks like a trash heap of HTML tags.

If it can't read your site easily, it moves on.

## The Solution: A VIP Entrance for Robots

I found out about a standard called `/llms.txt`.
Basically, it's a text file you put on your site that says: *"Hey Robot, ignore the design. Here is just the raw facts."*

I wanted one. But I have 700+ pages. I wasn't going to copy-paste them manually.

So, I did my usual trick. I asked the CLI:
> *"Write a script that scans all my content and mashes it into one giant text file. Strip out the formatting. Just keep the good stuff."*

It took about 15 minutes of back-and-forth to get the script working.
Now, every time I update the site, this script runs and generates a fresh `llms.txt` file.

## Why You Should Care

You can try it right now.
Go to any AI model and ask it: *"Read https://realaiexamples.com/llms.txt and tell me the best blueprint for sales."*

It answers instantly. It doesn't hallucinate. It cites my content perfectly.

This is "SEO" for 2026.
We used to optimize for keywords. Now we have to optimize for *agents*.

I don't know exactly how the algorithms work. But I know that making my data easy to read is never a bad strategy. It cost me $0 and an hour of tinkering. Worth it.