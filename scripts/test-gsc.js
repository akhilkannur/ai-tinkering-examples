const { google } = require('googleapis');
const path = require('path');

// Configuration
const PROPERTY_URL = 'sc-domain:realaiexamples.com';
const KEY_FILE_PATH = path.join(process.cwd(), 'ga-credentials.json');

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

async function runReport() {
  console.log('Fetching search data for ' + PROPERTY_URL + '...');
  
  try {
    const searchconsole = google.searchconsole({ version: 'v1', auth });
    
    // Calculate date (2 days ago as GSC has a delay)
    const date = new Date();
    date.setDate(date.getDate() - 3);
    const dateString = date.toISOString().split('T')[0];

    const response = await searchconsole.searchanalytics.query({
      siteUrl: PROPERTY_URL,
      requestBody: {
        startDate: dateString,
        endDate: dateString,
        dimensions: ['query'],
        rowLimit: 10,
      },
    });

    console.log('\nTOP QUERIES FOR ' + dateString + ':\n');
    
    if (!response.data.rows || response.data.rows.length === 0) {
      console.log('No data found for this period. (GSC data often has a 48h delay)');
    } else {
      console.log('Query | Clicks | Impressions | CTR | Position');
      console.log('--------------------------------------------');
      response.data.rows.forEach(row => {
        const query = row.keys[0];
        const clicks = row.clicks;
        const impressions = row.impressions;
        const ctr = (row.ctr * 100).toFixed(2) + '%';
        const position = row.position.toFixed(1);
        console.log(`${query} | ${clicks} | ${impressions} | ${ctr} | ${position}`);
      });
    }
    
    console.log('\nConnection successful!');
  } catch (error) {
    console.error('\nERROR fetching GSC data:');
    console.error(error.message);
    if (error.message.includes('403')) {
      console.log('\nTip: Make sure the service account email is added to Search Console with "Full" permissions.');
    }
  }
}

runReport();