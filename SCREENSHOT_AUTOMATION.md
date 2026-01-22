# Automated Screenshot Capture System

## Overview

This system provides an automated way to capture, crop, and enhance screenshots from URLs for use in the AI Examples library. It replaces the need for manual screenshot capture and provides consistent, beautiful output that integrates seamlessly with the existing card-based UI.

## Features

- **Automatic Screenshot Capture**: Captures screenshots from any URL
- **Smart Cropping**: Removes unnecessary UI elements (sidebars, navigation, etc.) while focusing on content
- **Beautiful Framing**: Adds professional styling with gradients, shadows, and clean borders
- **Platform-Specific Presets**: Optimized cropping for Twitter/X, LinkedIn, and GitHub
- **Integration Ready**: Works with the existing ExampleCard component and data structures

## Components

### 1. capture-screenshot.js
- Core screenshot capture functionality using Puppeteer
- Implements smart cropping with platform-specific presets
- Outputs JPEG images with 85% quality for optimal file size

### 2. beautify-screenshot.js
- Adds professional framing to captured screenshots
- Creates gradient backgrounds, soft shadows, and clean borders
- Uses the Canvas API for image manipulation

### 3. create-example.js
- Main entry point for creating new examples
- Integrates screenshot capture with data entry
- Supports both local capture and beautiful output options

## Usage

### Basic Screenshot Capture
```bash
node scripts/create-example.js "https://x.com/user/status/12345"
```

### Local Capture (Skips Microlink API)
```bash
node scripts/create-example.js "https://x.com/user/status/12345" --local
```

### Beautiful Screenshot with Smart Cropping
```bash
node scripts/create-example.js "https://x.com/user/status/12345" --local --beautiful
```

### Short Form
```bash
node scripts/create-example.js "https://x.com/user/status/12345" -l -b
```

## Cropping Presets

The system uses platform-specific presets to optimize cropping:

- **Twitter/X**: `{ x: 150, y: 50, width: 900, height: 600 }`
- **LinkedIn**: `{ x: 150, y: 50, width: 900, height: 600 }`
- **GitHub**: `{ x: 0, y: 0, width: 1280, height: 800 }` (full page)

These coordinates focus on the main content while removing sidebars, navigation, and other UI elements.

## Data Structure

The system generates entries compatible with the existing ExampleRecord type:

```typescript
{
  id: string,                    // Unique identifier
  title: string,                 // Title of the example
  slug: string,                  // URL-friendly slug
  summary: string,               // Brief description
  screenshots: [                // Array of screenshot objects
    {
      url: string,               // Path to the image
      filename: string,          // Original filename
      thumbnails: {              // Thumbnail variations
        small: { url: string },
        large: { url: string }
      }
    }
  ],
  category: string,              // Category (e.g., "Marketing Ops")
  publish_date: string,          // Date in YYYY-MM-DD format
  original_link: string,         // Source URL
  author_name: string,           // Author name
  author_link: string,           // Author profile link
  tags: string[],                // Array of tags
  Sponsored: boolean,            // Whether it's sponsored
  sponsor: null | SponsorRecord // Sponsor information
}
```

## Integration with Existing System

The generated entries are automatically added to `lib/social-examples-data.ts` and integrate seamlessly with:

- The ExampleCard component
- The examples page filtering and display
- The modal view for detailed example viewing
- The existing category and tag systems

## Future Migration Plan

This system is designed to eventually replace the Airtable backend:

1. **Phase 1**: Use alongside Airtable (current state)
2. **Phase 2**: Gradually migrate existing examples to local storage
3. **Phase 3**: Remove Airtable dependency entirely

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- System dependencies for Puppeteer (Chrome/Chromium)

### Installation
```bash
npm install
npm install canvas # For beautiful screenshot functionality
```

### Environment Variables
No special environment variables are required for local capture functionality, though Airtable variables are still used for fallback.

## Troubleshooting

### Common Issues

1. **Canvas Installation Errors**: If you encounter issues with canvas installation, ensure you have the required system dependencies:
   - Ubuntu/Debian: `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev`
   - macOS: `brew install pkg-config cairo pango libpng jpeg giflib librsvg`

2. **Puppeteer Errors**: If Puppeteer fails to launch, try:
   - Install Chromium: `npm install chromium`
   - Use environment variable: `PUPPETEER_EXECUTABLE_PATH=/path/to/chromium`

3. **Permission Errors**: Ensure the `public/images/examples/` directory exists and is writable.

## Best Practices

- Use the `--beautiful` flag for production-ready screenshots
- Test cropping on different screen sizes if needed
- Verify that the generated entries match the expected data structure
- Check that screenshots load properly in the ExampleCard component

## Customization

To customize cropping for other platforms, add new presets in `capture-screenshot.js`:

```javascript
const presets = {
  twitter: { x: 150, y: 50, width: 900, height: 600 },
  x: { x: 150, y: 50, width: 900, height: 600 },
  linkedin: { x: 150, y: 50, width: 900, height: 600 },
  github: { x: 0, y: 0, width: 1280, height: 800 },
  // Add your custom preset here
  yourPlatform: { x: 100, y: 50, width: 1000, height: 650 },
  default: defaultClip
};
```

## Migration Path from Airtable

This system is designed to eventually replace Airtable as the data source:

1. **Current State**: Works alongside Airtable data
2. **Data Migration**: Gradually move Airtable entries to local storage
3. **Backend Replacement**: Replace Airtable API calls with local data queries
4. **Complete Removal**: Remove Airtable dependencies entirely

The data structure is compatible with the existing system, ensuring a smooth transition.