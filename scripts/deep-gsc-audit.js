const { google } = require('googleapis');
const path = require('path');

const PROPERTY_URL = 'sc-domain:realaiexamples.com';
const KEY_FILE_PATH = path.join(process.cwd(), 'ga-credentials.json');

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

async function runReport() {
  try {
    const searchconsole = google.searchconsole({ version: 'v1', auth });
    
    const d = new Date();
    d.setDate(d.getDate() - 7); // Look at last 7 days for more volume
    const startDate = d.toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];

    const response = await searchconsole.searchanalytics.query({
      siteUrl: PROPERTY_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 50,
      },
    });

    if (!response.data.rows || response.data.rows.length === 0) {
      console.log('No data found.');
    } else {
      console.log('QUERY | IMPRESSIONS | POSITION');
      console.log('-----------------------------');
      // Sort by impressions to see what people are actually searching for
      const sorted = response.data.rows.sort((a, b) => b.impressions - a.impressions);
      sorted.slice(0, 20).forEach(row => {
        console.log(`${row.keys[0]} | ${row.impressions} | ${row.position.toFixed(1)}`);
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

runReport();
