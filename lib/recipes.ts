import fs from 'fs';
import path from 'path';
import { Recipe } from './cookbook-data';

const recipesDir = path.join(process.cwd(), 'content/recipes');

export function getAllRecipes(): Recipe[] {
  const fileNames = fs.readdirSync(recipesDir);
  const allRecipes = fileNames.map((fileName) => {
    const fullPath = path.join(recipesDir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
  });
  
  return allRecipes;
}