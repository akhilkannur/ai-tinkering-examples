export interface EnrichedExampleRecord {
  id: string;
  title: string;
  slug: string;
  summary?: string | null;
  screenshots?: {
    url: string;
    filename?: string;
    thumbnails?: {
      small: { url: string };
      large: { url: string };
    };
  }[] | null;
  cloudinaryPublicId?: string | null;
  category?: string | null;
  categoryId?: string | null;
  read_time?: number | null;
  publish_date?: string | null;
  workflow_steps?: string | null;
  original_link?: string | null;
  tags?: string[] | null;
  author_name?: string | null;
  author_link?: string | null;
}
