const { google } = require('googleapis');
const path = require('path');

const PROPERTY_URL = 'sc-domain:realaiexamples.com';
const KEY_FILE_PATH = path.join(process.cwd(), 'ga-credentials.json');

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

async function runReport(startDate, endDate, dimensions = ['query'], rowLimit = 25) {
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  
  const response = await searchconsole.searchanalytics.query({
    siteUrl: PROPERTY_URL,
    requestBody: {
      startDate,
      endDate,
      dimensions,
      rowLimit,
    },
  });
  
  return response.data.rows || [];
}

async function seoAudit() {
  // Calculate dates
  const today = new Date();
  
  // This week (last 7 days, offset by 3 for GSC delay)
  const thisWeekEnd = new Date(today);
  thisWeekEnd.setDate(today.getDate() - 3);
  const thisWeekStart = new Date(thisWeekEnd);
  thisWeekStart.setDate(thisWeekEnd.getDate() - 6);
  
  // Last week
  const lastWeekEnd = new Date(thisWeekStart);
  lastWeekEnd.setDate(thisWeekStart.getDate() - 1);
  const lastWeekStart = new Date(lastWeekEnd);
  lastWeekStart.setDate(lastWeekEnd.getDate() - 6);
  
  const formatDate = (d) => d.toISOString().split('T')[0];
  
  console.log('='.repeat(70));
  console.log('SEO AUDIT REPORT - realaiexamples.com');
  console.log('='.repeat(70));
  console.log(`This Week: ${formatDate(thisWeekStart)} to ${formatDate(thisWeekEnd)}`);
  console.log(`Last Week: ${formatDate(lastWeekStart)} to ${formatDate(lastWeekEnd)}`);
  console.log('');
  
  // 1. Overall metrics comparison
  console.log('\n📊 OVERALL METRICS COMPARISON');
  console.log('-'.repeat(50));
  
  const thisWeekData = await runReport(formatDate(thisWeekStart), formatDate(thisWeekEnd), ['date'], 100);
  const lastWeekData = await runReport(formatDate(lastWeekStart), formatDate(lastWeekEnd), ['date'], 100);
  
  const sumMetrics = (rows) => rows.reduce((acc, row) => ({
    clicks: acc.clicks + row.clicks,
    impressions: acc.impressions + row.impressions,
    position: acc.position + row.position,
    count: acc.count + 1
  }), { clicks: 0, impressions: 0, position: 0, count: 0 });
  
  const thisWeekTotals = sumMetrics(thisWeekData);
  const lastWeekTotals = sumMetrics(lastWeekData);
  
  const avgPosThis = thisWeekTotals.count ? (thisWeekTotals.position / thisWeekTotals.count).toFixed(1) : 'N/A';
  const avgPosLast = lastWeekTotals.count ? (lastWeekTotals.position / lastWeekTotals.count).toFixed(1) : 'N/A';
  
  console.log(`                  This Week    Last Week    Change`);
  console.log(`Clicks:           ${String(thisWeekTotals.clicks).padEnd(12)} ${String(lastWeekTotals.clicks).padEnd(12)} ${thisWeekTotals.clicks - lastWeekTotals.clicks}`);
  console.log(`Impressions:      ${String(thisWeekTotals.impressions).padEnd(12)} ${String(lastWeekTotals.impressions).padEnd(12)} ${thisWeekTotals.impressions - lastWeekTotals.impressions}`);
  console.log(`Avg Position:     ${String(avgPosThis).padEnd(12)} ${String(avgPosLast).padEnd(12)}`);
  
  // 2. Top queries this week
  console.log('\n\n🔍 TOP QUERIES THIS WEEK (by impressions)');
  console.log('-'.repeat(70));
  const topQueries = await runReport(formatDate(thisWeekStart), formatDate(thisWeekEnd), ['query'], 15);
  console.log('Query'.padEnd(50) + 'Clicks  Impr   Pos');
  topQueries.forEach(row => {
    console.log(`${row.keys[0].substring(0, 48).padEnd(50)} ${String(row.clicks).padEnd(7)} ${String(row.impressions).padEnd(6)} ${row.position.toFixed(1)}`);
  });
  
  // 3. Top pages
  console.log('\n\n📄 TOP PAGES THIS WEEK');
  console.log('-'.repeat(70));
  const topPages = await runReport(formatDate(thisWeekStart), formatDate(thisWeekEnd), ['page'], 15);
  console.log('Page'.padEnd(55) + 'Clicks  Impr   Pos');
  topPages.forEach(row => {
    const page = row.keys[0].replace('https://realaiexamples.com', '');
    console.log(`${page.substring(0, 53).padEnd(55)} ${String(row.clicks).padEnd(7)} ${String(row.impressions).padEnd(6)} ${row.position.toFixed(1)}`);
  });
  
  // 4. Day-by-day breakdown
  console.log('\n\n📅 DAILY BREAKDOWN (Last 14 days)');
  console.log('-'.repeat(50));
  
  const twoWeeksAgo = new Date(today);
  twoWeeksAgo.setDate(today.getDate() - 17);
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 3);
  
  const dailyData = await runReport(formatDate(twoWeeksAgo), formatDate(threeDaysAgo), ['date'], 30);
  dailyData.sort((a, b) => a.keys[0].localeCompare(b.keys[0]));
  
  console.log('Date'.padEnd(15) + 'Clicks  Impressions  Avg Position');
  dailyData.forEach(row => {
    console.log(`${row.keys[0].padEnd(15)} ${String(row.clicks).padEnd(8)} ${String(row.impressions).padEnd(13)} ${row.position.toFixed(1)}`);
  });
  
  // 5. Check for ranking drops
  console.log('\n\n⚠️  POTENTIAL ISSUES');
  console.log('-'.repeat(50));
  
  if (thisWeekTotals.clicks === 0 && lastWeekTotals.clicks === 0) {
    console.log('🔴 CRITICAL: Zero clicks for 2 weeks straight');
    console.log('   Possible causes:');
    console.log('   - Site is new and not yet indexed');
    console.log('   - Manual action or penalty');
    console.log('   - Robots.txt blocking crawlers');
    console.log('   - Noindex tags on pages');
  }
  
  if (thisWeekTotals.impressions < lastWeekTotals.impressions * 0.5) {
    console.log('🟠 WARNING: Impressions dropped by more than 50%');
  }
  
  const avgPosThisNum = parseFloat(avgPosThis);
  const avgPosLastNum = parseFloat(avgPosLast);
  if (avgPosThisNum > avgPosLastNum + 10) {
    console.log('🟠 WARNING: Average position dropped significantly');
  }
  
  console.log('\n');
}

seoAudit().catch(console.error);
