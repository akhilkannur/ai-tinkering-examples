import fs from 'fs';
import path from 'path';

export interface InvestorCSV {
  FirmName: string;
  Website: string;
  KeyContact: string;
  ContactRole: string;
  Email: string;
  SocialContactURL: string;
  InvestmentThesis: string;
  RevenueRange: string;
  PortfolioExamples: string;
  CheckSize: string;
  GeographicFocus: string;
  DealType: string;
  TargetEBITDA: string;
  FundingSource: string;
}

export function parseCSV(filePath: string): InvestorCSV[] {
  const absolutePath = path.join(process.cwd(), filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  
  const lines = fileContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/ /g, '')); // Remove spaces for keys
  
  const result: InvestorCSV[] = [];

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i];
    if (!currentLine.trim()) continue;

    // Handle quoted fields containing commas
    const values: string[] = [];
    let inQuote = false;
    let currentValue = '';

    for (let j = 0; j < currentLine.length; j++) {
      const char = currentLine[j];
      
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim()); // Push the last value

    const obj: any = {};
    headers.forEach((header, index) => {
      // Remove quotes from values if present
      let value = values[index] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      obj[header] = value;
    });

    result.push(obj as InvestorCSV);
  }

  return result;
}
