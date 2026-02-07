const { google } = require('googleapis');
const path = require('path');

const PROPERTY_URL = 'sc-domain:realaiexamples.com';
const KEY_FILE_PATH = path.join(process.cwd(), 'ga-credentials.json');

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

async function runReport(startDate, endDate) {
  try {
    const searchconsole = google.searchconsole({ version: 'v1', auth });
    
    // Default to 3 days ago if no date provided (GSC delay)
    if (!startDate) {
        const d = new Date();
        d.setDate(d.getDate() - 3);
        startDate = d.toISOString().split('T')[0];
        endDate = startDate;
    }

    const response = await searchconsole.searchanalytics.query({
      siteUrl: PROPERTY_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 10,
      },
    });

    if (!response.data.rows || response.data.rows.length === 0) {
      console.log(`No search data found for ${startDate}.`);
    } else {
      console.log(`Top Queries for ${startDate}:`);
      console.log("Query | Clicks | Impressions | Position");
      console.log("---------------------------------------");
      response.data.rows.forEach(row => {
        console.log(`${row.keys[0]} | ${row.clicks} | ${row.impressions} | ${row.position.toFixed(1)}`);
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const args = process.argv.slice(2);
runReport(args[0], args[1]);
