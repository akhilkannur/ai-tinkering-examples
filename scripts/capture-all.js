const captureScreenshot = require('./capture-screenshot');

const tools = [
  { url: 'https://octopost.ai', filename: 'octopost.png' },
  { url: 'https://bridgecall.app', filename: 'bridgecall.png' },
  { url: 'https://getlevl.ai', filename: 'levl.png' },
  { url: 'https://greenpt.nl/frida', filename: 'greenpt.png' },
  { url: 'https://app.imeett.ai', filename: 'imeett.png' },
  { url: 'https://www.webcomparis.com', filename: 'webcomparis.png' },
  { url: 'https://www.pathwiseai.io/', filename: 'pathwiseai.png' },
  { url: 'https://transgull.com', filename: 'transgull.png' },
  { url: 'https://watchflow.io', filename: 'watchflow.png' }
];

async function run() {
  for (const tool of tools) {
    console.log(`Processing ${tool.url}...`);
    await captureScreenshot(tool.url, tool.filename);
  }
}

run().catch(console.error);
