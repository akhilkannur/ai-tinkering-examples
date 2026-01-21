const fs = require('fs');
const path = require('path');
const https = require('https');

const args = process.argv.slice(2);
const url = args[0];

if (!url) {
  console.error('Please provide a URL (e.g., Twitter link)');
  process.exit(1);
}

const MICROLINK_API = `https://api.microlink.io?url=${encodeURIComponent(url)}&meta=true&screenshot=true`;

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const stream = fs.createWriteStream(filepath);
        res.pipe(stream);
        stream.on('finish', () => {
            stream.close();
            resolve(filepath);
        });
        stream.on('error', reject);
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
}

async function createSocialExample() {
  console.log(`🔍 Fetching metadata for: ${url}`);
  
  try {
    const response = await fetch(MICROLINK_API);
    const data = await response.json();
    
    if (data.status !== 'success') {
      throw new Error('Microlink failed to fetch data');
    }

    const meta = data.data;
    const title = (meta.title || 'New AI Automation').replace(/"/g, "'");
    const description = (meta.description || 'No description found.').replace(/"/g, "'");
    const author = meta.author || 'Unknown';
    const authorHandle = url.split('/')[3] || author;
    
    const imageUrl = meta.image?.url || meta.screenshot?.url;
    
    const date = new Date().toISOString().split('T')[0];
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 50);
    const id = `${authorHandle.toLowerCase()}-${slug}`;
    const imageFilename = `${date}-${id}.jpg`;
    
    if (imageUrl) {
      console.log(`⬇️ Downloading image...`);
      const imagePath = path.join(process.cwd(), 'public/images/examples', imageFilename);
      fs.mkdirSync(path.dirname(imagePath), { recursive: true });
      await downloadImage(imageUrl, imagePath);
      console.log(`✅ Image saved to: /images/examples/${imageFilename}`);
    }

    const newEntry = `
  {
    id: "${id}",
    title: "${title}",
    slug: "${id}",
    summary: "${description.substring(0, 200)}",
    screenshots: [
      {
        url: "/images/examples/${imageFilename}",
        filename: "${imageFilename}",
        thumbnails: {
          small: { url: "/images/examples/${imageFilename}" },
          large: { url: "/images/examples/${imageFilename}" }
        }
      }
    ],
    category: "Marketing Ops",
    publish_date: "${date}",
    original_link: "${url}",
    author_name: "${author}",
    author_link: "https://x.com/${authorHandle}",
    tags: ["Automation"],
    Sponsored: false,
    sponsor: null
  },`;

    const filePath = path.join(process.cwd(), 'lib/social-examples-data.ts');
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the end of the array
    const lastBracketIndex = content.lastIndexOf('];');
    if (lastBracketIndex !== -1) {
      const beforeBracket = content.substring(0, lastBracketIndex).trim();
      let prefix = "";
      
      // If the last character before the bracket is a closing brace and NOT a comma, add a comma
      if (beforeBracket.endsWith('}') && !beforeBracket.endsWith('},')) {
        prefix = ",";
      }
      
      content = content.substring(0, lastBracketIndex).trimEnd() + prefix + newEntry + "\n];";
      fs.writeFileSync(filePath, content);
      console.log(`\n🎉 Entry added to lib/social-examples-data.ts`);
    } else {
      console.error('❌ Could not find ]; in lib/social-examples-data.ts');
    }

  } catch (error) {
    console.error('🔥 Error:', error.message);
  }
}

createSocialExample();