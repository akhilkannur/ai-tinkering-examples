import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDir = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  date: string;
  author: {
    name: string;
    picture?: string;
  };
  relatedRecipes?: string[]; // IDs of recipes used in this chain
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDir)) return [];
  
  const fileNames = fs.readdirSync(blogDir);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        coverImage: data.coverImage || null,
        date: data.date,
        author: data.author,
        relatedRecipes: data.relatedRecipes || [],
        content,
      } as BlogPost;
    })
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

  return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDir, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      coverImage: data.coverImage || null,
      date: data.date,
      author: data.author,
      relatedRecipes: data.relatedRecipes || [],
      content,
    } as BlogPost;
  } catch (e) {
    return null;
  }
}
