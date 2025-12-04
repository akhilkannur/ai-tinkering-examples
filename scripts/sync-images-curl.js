const { exec } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });
const cloudinary = require('cloudinary').v2;

// Config
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.NEXT_PUBLIC_AIRTABLE_TABLE || 'Examples';
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`;

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

function curlFetch(url) {
  return new Promise((resolve, reject) => {
    const cmd = `curl -s -H "Authorization: Bearer ${AIRTABLE_API_KEY}" "${url}"`;
    exec(cmd, { timeout: 30000 }, (error, stdout, stderr) => { // Added timeout here
      if (error) {
        reject(error);
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (e) {
        reject(new Error('Failed to parse JSON: ' + stdout + '\nError: ' + e.message));
      }
    });
  });
}

function curlPatch(url, body) {
    return new Promise((resolve, reject) => {
      // Escape the JSON body for the shell command
      const jsonBody = JSON.stringify(body).replace(/"/g, '\\"');
      // Added -v to see headers if needed, but mainly just capturing output
      const cmd = `curl -s -X PATCH -H "Authorization: Bearer ${AIRTABLE_API_KEY}" -H "Content-Type: application/json" -d "${jsonBody}" "${url}"`;
      exec(cmd, { timeout: 30000 }, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout);
      });
    });
  }

async function syncImages() {
  console.log('🚀 Starting image sync (CURL Version)...');
  
  try {
    const filterFormula = "AND(NOT({Screenshots} = ''), {CloudinaryPublicId} = '')";
    const url = `${AIRTABLE_API_URL}?filterByFormula=${encodeURIComponent(filterFormula)}`;
    
    console.log('🔍 Fetching from Airtable via curl...');
    const data = await curlFetch(url);
    
    const records = data.records || [];
    console.log(`📋 Found ${records.length} records to process.`);

    for (const record of records) {
      const fields = record.fields;
      const title = fields.Title;
      const screenshots = fields.Screenshots;

      if (!screenshots || screenshots.length === 0) continue;

      const imageUrl = screenshots[0].url;
      console.log(`Processing "${title}"...`);

      try {
        // Upload to Cloudinary
        console.log('  ☁️ Uploading to Cloudinary...');
        const result = await cloudinary.uploader.upload(imageUrl, {
          folder: 'ai_tinkering_examples',
          public_id: `example_${record.id}`,
          overwrite: true,
        });

        console.log(`  ✅ Uploaded: ${result.public_id}`);

        // Update Airtable via CURL
        const updateUrl = `${AIRTABLE_API_URL}/${record.id}`;
        const patchResponse = await curlPatch(updateUrl, {
            fields: {
              'CloudinaryPublicId': result.public_id
            }
        });

        console.log(`  📝 Airtable Response: ${patchResponse}`); // Log the actual response!

        if (patchResponse.includes('"error"')) {
             console.error('  ❌ Airtable Update Failed!');
        } else {
             console.log(`  ✅ Updated Airtable record`);
        }

      } catch (err) {
        console.error(`  ❌ Error processing "${title}":`, err.message || err);
      }
    }

    console.log('🎉 Sync Complete!');

  } catch (error) {
    console.error('🔥 Fatal Error:', error);
  }
}

syncImages();
