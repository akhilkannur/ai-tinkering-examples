import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Recipe } from './cookbook-data';

const recipesDir = path.join(process.cwd(), 'content/recipes');

export function getAllRecipes(): Recipe[] {
  // Read all files in the directory
  const fileNames = fs.readdirSync(recipesDir);
  
  // Filter for .md files
  const allRecipes = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(recipesDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);
      
      // Combine the data with the content (blueprint)
      return {
        ...data,
        blueprint: content,
      } as Recipe;
    });
  
  return allRecipes;
}