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

// Validate Config
const missingVars = [];
if (!AIRTABLE_API_KEY) missingVars.push('AIRTABLE_API_KEY');
if (!AIRTABLE_BASE_ID) missingVars.push('NEXT_PUBLIC_AIRTABLE_BASE_ID');
if (!CLOUDINARY_CLOUD_NAME) missingVars.push('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
if (!CLOUDINARY_API_KEY) missingVars.push('CLOUDINARY_API_KEY');
if (!CLOUDINARY_API_SECRET) missingVars.push('CLOUDINARY_API_SECRET');

if (missingVars.length > 0) {
  console.error('❌ Missing environment variables:', missingVars.join(', '));
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

async function syncImages() {
  console.log('🚀 Starting image sync (Native Fetch Version)...');
  console.log(`Using Airtable Base: ${AIRTABLE_BASE_ID}`);
  console.log(`Using Cloudinary Cloud: ${CLOUDINARY_CLOUD_NAME}`);

  try {
    // 1. Fetch Records
    console.log('🔍 Finding records to process...');
    
    // Using native fetch with encoded filter formula
    const filterFormula = "AND(NOT({Screenshots} = ''), {CloudinaryPublicId} = '')";
    const url = `${AIRTABLE_API_URL}?filterByFormula=${encodeURIComponent(filterFormula)}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Airtable API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const records = data.records || [];

    console.log(`📋 Found ${records.length} records to process.`);

    let successCount = 0;
    let errorCount = 0;

    for (const record of records) {
      const fields = record.fields;
      const title = fields.Title;
      const screenshots = fields.Screenshots;

      if (!screenshots || screenshots.length === 0) continue;

      const imageUrl = screenshots[0].url;
      console.log(`Processing "${title}"...`);

      try {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(imageUrl, {
          folder: 'ai_tinkering_examples',
          public_id: `example_${record.id}`,
          overwrite: true,
        });

        console.log(`  ✅ Uploaded to Cloudinary: ${result.public_id}`);

        // Update Airtable using fetch PATCH
        const updateUrl = `${AIRTABLE_API_URL}/${record.id}`;
        const updateResponse = await fetch(updateUrl, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: {
              'CloudinaryPublicId': result.public_id
            }
          })
        });

        if (!updateResponse.ok) {
          const errText = await updateResponse.text();
          throw new Error(`Failed to update Airtable: ${updateResponse.status} - ${errText}`);
        }

        console.log(`  ✅ Updated Airtable record`);
        successCount++;
      } catch (err) {
        console.error(`  ❌ Error processing "${title}":`, err.message);
        errorCount++;
      }
    }

    console.log('\n--------------------------------');
    console.log('🎉 Sync Complete!');
    console.log(`✅ Successfully synced: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);

  } catch (error) {
    console.error('🔥 Fatal Error:', error);
  }
}

syncImages();