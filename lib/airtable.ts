// Triggering a new deployment
import Airtable, { SelectOptions, FieldSet } from 'airtable'

// Configuration
const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID
const apiKey = process.env.AIRTABLE_API_KEY
const examplesTable = process.env.NEXT_PUBLIC_AIRTABLE_TABLE || 'Examples'
const categoriesTable = process.env.NEXT_PUBLIC_AIRTABLE_CATEGORIES_TABLE || 'Categories'
const sponsorsTable = process.env.NEXT_PUBLIC_AIRTABLE_SPONSORS_TABLE || 'Sponsors'
const jobsTable = process.env.NEXT_PUBLIC_AIRTABLE_JOBS_TABLE || 'Jobs'
const toolsTable = process.env.NEXT_PUBLIC_AIRTABLE_TOOLS_TABLE || 'Tools'
const siteSettingsTable = process.env.NEXT_PUBLIC_AIRTABLE_SITE_SETTINGS_TABLE || 'Site Settings'

console.log('Airtable Config:', {
  baseId: baseId ? `${baseId.slice(0, 8)}...` : 'missing',
  apiKey: apiKey ? `${apiKey.slice(0, 8)}...` : 'missing',
  examplesTable,
  categoriesTable,
  sponsorsTable,
  jobsTable,
  toolsTable,
  siteSettingsTable,
})

if (!baseId || !apiKey) {
  console.error('❌ Airtable not configured properly!')
  console.error('Required environment variables:')
  console.error('- NEXT_PUBLIC_AIRTABLE_BASE_ID:', baseId ? '✓' : '❌ missing')
  console.error('- AIRTABLE_API_KEY:', apiKey ? '✓' : '❌ missing')
}

const base = baseId && apiKey ? new Airtable({ apiKey }).base(baseId) : null

// --- TYPES ---

export type SponsorRecord = {
  id: string;
  name: string;
  logo?: { 
    url: string;
    thumbnails?: {
      small: { url: string };
      large: { url: string };
    }
  }[] | null;
  website?: string | null;
  categoryId?: string | null;
  description?: string | null;
};

export type JobRecord = {
  id: string;
  jobTitle: string;
  companyName: string;
  companyLogo?: { 
    url: string;
    thumbnails?: {
      small: { url: string };
      large: { url: string };
    }
  }[] | null;
  jobUrl: string;
  location?: string | null;
  description?: string | null;
  featured: boolean;
};

export type ToolRecord = {
  id: string;
  toolName: string;
  logo?: { 
    url: string;
    thumbnails?: {
      small: { url: string };
      large: { url: string };
    }
  }[] | null;
  websiteUrl: string;
  shortDescription?: string | null;
  featured: boolean;
};

export type CategoryRecord = {
  id: string;
  name: string;
};

export type ExampleRecord = {
  id: string
  title: string
  slug: string
  summary?: string | null
  screenshots?: {
    url: string
    filename?: string
    thumbnails?: {
      small: { url: string }
      large: { url: string }
    }
  }[] | null
  cloudinaryPublicId?: string | null
  category?: string | null
  categoryId?: string | null
  read_time?: number | null
  publish_date?: string | null
  workflow_steps?: string | null
  original_link?: string | null
  tags?: string[] | null
  author_name?: string | null
  author_link?: string | null
  Sponsored?: boolean | null
}

export type EnrichedExampleRecord = ExampleRecord & { sponsor?: SponsorRecord | null };

export type SiteSettingRecord = {
  id: string;
  settingName: string;
  enabled: boolean;
};

// --- PROCESSORS ---

function processExampleRecord(record: any): ExampleRecord {
  const title = record.get('Title') as string
  const slug = (record.get('Slug') as string) || 
    title?.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') || 
    `record-${record.id}`

  const categoryIds = record.get('Category') as string[] | null
  
  // FIX: Handle Airtable attachments properly
  const screenshotsRaw = record.get('Screenshots')
  let screenshots = null
  
  if (screenshotsRaw && Array.isArray(screenshotsRaw) && screenshotsRaw.length > 0) {
    screenshots = screenshotsRaw.map((att: any) => ({
      url: att.url,
      filename: att.filename || 'screenshot',
      thumbnails: att.thumbnails ? {
        small: att.thumbnails.small,
        large: att.thumbnails.large,
      } : undefined
    }))
    
    console.log('✅ Processed screenshots for:', title, screenshots.map((s: any) => s.url))
  } else {
    console.warn('⚠️ No screenshots found for:', title)
  }

  return {
    id: record.id,
    title: title || 'Untitled',
    slug,
    summary: record.get('Summary') as string || null,
    screenshots: screenshots,
    cloudinaryPublicId: record.get('CloudinaryPublicId') as string || null,
    categoryId: categoryIds?.[0] || null,
    read_time: record.get('Read time') as number || null,
    publish_date: record.get('Publish date') as string || null,
    workflow_steps: record.get('Workflow steps') as string || null,
    original_link: record.get('Original link') as string || null,
    tags: (record.get('Tags') as string[]) || null,
    author_name: record.get('Author name') as string || null,
    author_link: record.get('Author link') as string || null,
    Sponsored: record.get('Sponsored') as boolean || false,
  }
}

function processCategoryRecord(record: any): CategoryRecord {
  return {
    id: record.id,
    name: record.get('Name') as string,
  };
}

function processSponsorRecord(record: any): SponsorRecord {
  const categoryIds = record.get('Category') as string[] | null;
  const logoRaw = record.get('Logo');
  let logo = null;
  if (logoRaw && Array.isArray(logoRaw) && logoRaw.length > 0) {
    logo = logoRaw.map((att: any) => ({
      url: att.url,
      filename: att.filename,
      thumbnails: att.thumbnails ? {
        small: att.thumbnails.small,
        large: att.thumbnails.large,
      } : undefined
    }));
  }

  return {
    id: record.id,
    name: (record.get('Name') as string) || 'Unnamed Sponsor',
    logo: logo,
    website: (record.get('Website') as string | null) ?? null,
    categoryId: categoryIds?.[0] || null,
    description: (record.get('Description') as string | null) ?? null,
  };
}

function processJobRecord(record: any): JobRecord {
  const companyLogoRaw = record.get('Company Logo');
  let companyLogo = null;
  if (companyLogoRaw && Array.isArray(companyLogoRaw) && companyLogoRaw.length > 0) {
    companyLogo = companyLogoRaw.map((att: any) => ({
      url: att.url,
      filename: att.filename,
      thumbnails: att.thumbnails ? {
        small: att.thumbnails.small,
        large: att.thumbnails.large,
      } : undefined
    }));
  }

  return {
    id: record.id,
    jobTitle: record.get('Job Title') as string || 'Untitled Job',
    companyName: record.get('Company Name') as string || 'Unknown Company',
    companyLogo: companyLogo,
    jobUrl: record.get('Job URL') as string || '#',
    location: record.get('Location') as string || null,
    description: record.get('Description') as string || null,
    featured: record.get('Featured') as boolean || false,
  };
}

function processToolRecord(record: any): ToolRecord {
  const logoRaw = record.get('Logo');
  let logo = null;
  if (logoRaw && Array.isArray(logoRaw) && logoRaw.length > 0) {
    logo = logoRaw.map((att: any) => ({
      url: att.url,
      filename: att.filename,
      thumbnails: att.thumbnails ? {
        small: att.thumbnails.small,
        large: att.thumbnails.large,
      } : undefined
    }));
  }

  return {
    id: record.id,
    toolName: record.get('Tool Name') as string || 'Untitled Tool',
    logo: logo,
    websiteUrl: record.get('Website URL') as string || '#',
    shortDescription: record.get('Short Description') as string || null,
    featured: record.get('Featured') as boolean || false,
  };
}

function processSiteSettingRecord(record: any): SiteSettingRecord {
  return {
    id: record.id,
    settingName: record.get('Setting Name') as string,
    enabled: record.get('Enabled') as boolean || false,
  };
}

// --- FETCHERS ---

async function fetchAll<T>(tableName: string, processFn: (record: any) => T): Promise<T[]> {
  if (!base) {
    console.warn(`⚠️ Airtable not configured, returning empty array for ${tableName}`);
    return [];
  }

  console.log(`🔄 Fetching all records from ${tableName}...`);
  try {
    const selectOptions: SelectOptions<FieldSet> = {};
    if (tableName === examplesTable) {
      selectOptions.filterByFormula = '{Published}';
    }
    const allRecords = await base(tableName).select(selectOptions).all();
    console.log(`✅ Found ${allRecords.length} records in ${tableName}`);
    const processed = allRecords.map(processFn);
    return processed;
  } catch (error) {
    console.error(`❌ Error fetching from ${tableName}:`, error);
    return [];
  }
}

export const fetchExamples = () => fetchAll(examplesTable, processExampleRecord);
export const fetchCategories = () => fetchAll(categoriesTable, processCategoryRecord);
export const fetchSponsors = () => fetchAll(sponsorsTable, processSponsorRecord);

export async function fetchFeaturedJobs(): Promise<JobRecord[]> {
  if (!base) {
    console.warn('⚠️ Airtable not configured for jobs, returning empty array');
    return [];
  }
  try {
    const records = await base(jobsTable).select({ filterByFormula: '{Featured}' }).all();
    return records.map(processJobRecord);
  } catch (error) {
    console.error('❌ Error fetching featured jobs from Airtable:', error);
    return [];
  }
}

export async function fetchAllJobs(): Promise<JobRecord[]> {
  if (!base) {
    console.warn('⚠️ Airtable not configured for jobs, returning empty array');
    return [];
  }
  try {
    const records = await base(jobsTable).select().all();
    return records.map(processJobRecord);
  } catch (error) {
    console.error('❌ Error fetching all jobs from Airtable:', error);
    return [];
  }
}

export async function fetchFeaturedTools(): Promise<ToolRecord[]> {
  if (!base) {
    console.warn('⚠️ Airtable not configured for tools, returning empty array');
    return [];
  }
  try {
    const records = await base(toolsTable).select({ filterByFormula: '{Featured}' }).all();
    return records.map(processToolRecord);
  } catch (error) {
    console.error('❌ Error fetching featured tools from Airtable:', error);
    return [];
  }
}

export async function fetchAllTools(): Promise<ToolRecord[]> {
  if (!base) {
    console.warn('⚠️ Airtable not configured for tools, returning empty array');
    return [];
  }
  try {
    const records = await base(toolsTable).select().all();
    return records.map(processToolRecord);
  } catch (error) {
    console.error('❌ Error fetching all tools from Airtable:', error);
    return [];
  }
}

export async function fetchSiteSettings(): Promise<SiteSettingRecord[]> {
  if (!base) {
    console.warn('⚠️ Airtable not configured for site settings, returning empty array');
    return [];
  }
  try {
    const records = await base(siteSettingsTable).select().all();
    return records.map(processSiteSettingRecord);
  } catch (error) {
    console.error('❌ Error fetching site settings from Airtable:', error);
    return [];
  }
}

export async function fetchExampleBySlug(slug: string): Promise<ExampleRecord | null> {
  if (!base) {
    console.warn('⚠️ Airtable not configured')
    return null
  }

  console.log(`🔄 Fetching example with slug: ${slug}`)

  try {
    let records = await base(examplesTable)
      .select({ 
        filterByFormula: `{Slug} = "${slug}"`,
        maxRecords: 1 
      })
      .all()

    if (records.length === 0) {
      console.log(`🔍 No record found with slug "${slug}", trying title-based search...`)
      
      const allRecords = await base(examplesTable).select().all()
      
      for (const record of allRecords) {
        const processedRecord = processExampleRecord(record)
        if (processedRecord.slug === slug) {
          records = [record]
          break
        }
      }
    }

    if (records.length === 0) {
      console.log(`❌ No example found with slug: ${slug}`)
      return null
    }

    const example = processExampleRecord(records[0])
    console.log(`✅ Found example: ${example.title}`)
    return example

  } catch (error) {
    console.error(`❌ Error fetching example by slug "${slug}":`, error)
    return null
  }
}

// --- ENRICHMENT HELPERS ---

async function enrichExamples(examples: ExampleRecord[]): Promise<EnrichedExampleRecord[]> {
  const [categories, sponsors] = await Promise.all([
    fetchCategories(),
    fetchSponsors(),
  ]);

  const categoriesById = new Map(categories.map(c => [c.id, c.name]));
  const sponsorsByCategoryId = new Map(sponsors.map(s => [s.categoryId, s]));

  return examples.map(example => {
    const categoryName = example.categoryId ? categoriesById.get(example.categoryId) : null;
    const sponsor = example.categoryId ? (sponsorsByCategoryId.get(example.categoryId) ?? null) : null;
    return {
      ...example,
      category: categoryName || example.category || null,
      sponsor: sponsor,
    };
  });
}

// --- PUBLIC API ---

export async function fetchEnrichedExamples(): Promise<EnrichedExampleRecord[]> {
  const rawExamples = await fetchExamples();
  return enrichExamples(rawExamples);
}

export async function fetchEnrichedExampleBySlug(slug: string): Promise<EnrichedExampleRecord | null> {
  const example = await fetchExampleBySlug(slug);
  if (!example) return null;

  const [enriched] = await enrichExamples([example]);
  return enriched;
}

export async function testAirtableConnection(): Promise<boolean> {
  if (!base) return false
  
  try {
    const result = await base(examplesTable).select({ maxRecords: 1 }).all()
    console.log('✅ Airtable connection successful')
    return true
  } catch (error) {
    console.error('❌ Airtable connection failed:', error)
    return false
  }
}