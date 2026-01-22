# Screenshot Automation System

Automated screenshot capture, cropping, and enhancement for AI Examples.

## Quick Start

```bash
# Capture a beautiful, cropped screenshot from any URL
node scripts/create-example.js "YOUR_URL_HERE" --local --beautiful

# Or use the short form
node scripts/create-example.js "YOUR_URL_HERE" -l -b
```

## Features

- **Smart Cropping**: Automatically removes sidebars and navigation
- **Beautiful Framing**: Adds professional styling with shadows and gradients
- **Platform Optimization**: Pre-configured for Twitter/X, LinkedIn, GitHub
- **Easy Integration**: Works with existing ExampleCard components

## Commands

| Command | Description |
|--------|-------------|
| `node scripts/create-example.js URL` | Basic capture using Microlink API |
| `node scripts/create-example.js URL --local` | Local capture with smart cropping |
| `node scripts/create-example.js URL --local --beautiful` | Local capture with smart cropping + beautiful framing |

## Cropping Presets

- **Twitter/X**: Focuses on tweet content, removes sidebars
- **LinkedIn**: Focuses on feed content, minimizes navigation
- **GitHub**: Full page capture for code repositories

## Migration Path

This system is designed to replace Airtable as the data source:
1. Currently works alongside Airtable
2. Will gradually migrate to local data storage
3. Eventually remove Airtable dependency

## Requirements

- Node.js 18+
- npm packages: puppeteer, canvas
- System dependencies for Puppeteer and Canvas (see full documentation)