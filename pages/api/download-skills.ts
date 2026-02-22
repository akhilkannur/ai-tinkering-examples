import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

/**
 * Protected Download Endpoint for Master Skills
 * 
 * Usage:
 * /api/download-skills?order=ORDER_ID
 * /api/download-skills?token=LICENSE_KEY
 * 
 * Validates order/license and returns ZIP with all 5 Master Skills
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { order, token } = req.query;

  // Validate access (order ID or license key)
  const isValid = await validateAccess(order as string, token as string);

  if (!isValid) {
    return res.status(403).json({ 
      error: 'Invalid or expired access token',
      message: 'Please check your purchase email for the correct download link'
    });
  }

  // Path to master skills folder (NOT in /public)
  const skillsDir = path.join(process.cwd(), 'master-skills-private');

  // Check if files exist
  const requiredFiles = [
    'sales-ops.md',
    'marketing-ops.md',
    'seo-content.md',
    'revops-strategy.md',
    'automation-dev.md'
  ];

  for (const file of requiredFiles) {
    const filePath = path.join(skillsDir, file);
    if (!fs.existsSync(filePath)) {
      console.error('Missing skill file:', file);
      return res.status(500).json({ error: 'Skill file not found', file });
    }
  }

  // Create ZIP stream
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });

  // Handle archive errors
  archive.on('error', (err) => {
    console.error('Archive error:', err);
    res.status(500).json({ error: 'Failed to create download' });
  });

  // Set response headers
  res.attachment('real-ai-examples-master-skills.zip');

  // Pipe archive to response
  archive.pipe(res);

  // Add files to archive
  archive.directory(skillsDir, false, (entry) => {
    // Only include .md files and install scripts
    if (entry.name.endsWith('.md') || entry.name.endsWith('.sh') || entry.name.endsWith('.bat')) {
      return entry;
    }
    return false;
  });

  // Finalize archive
  await archive.finalize();
}

/**
 * Validate order or license token
 * 
 * In production, connect to your payment processor (Dopple, Gumroad, etc.)
 * or check against a database of valid orders
 */
async function validateAccess(order?: string, token?: string): Promise<boolean> {
  // If neither provided, invalid
  if (!order && !token) {
    return false;
  }

  const accessValue = order || token;

  if (!accessValue) {
    return false;
  }

  // TODO: Connect to your payment processor API
  // For now, accept any non-empty value (REMOVE IN PRODUCTION)
  
  // Example integration (pseudo-code):
  /*
  try {
    // Check Dopple/Gumroad/Stripe for valid order
    const orderData = await fetch(`https://api.dopple.com/orders/${accessValue}`, {
      headers: { 'Authorization': `Bearer ${process.env.DOPPLE_API_KEY}` }
    });
    
    if (!orderData.ok) return false;
    
    const orderInfo = await orderData.json();
    
    // Check if order is for the right product and is paid
    return orderInfo.product_id === 'pdt_0NW6p0szmXPS6jXW05hIP' 
      && orderInfo.status === 'paid';
  } catch (error) {
    console.error('Order validation error:', error);
    return false;
  }
  */

  // TEMPORARY: Accept any value (REMOVE BEFORE LAUNCH)
  // This lets you test the download flow now
  return accessValue.length > 5;
}

// Disable body parsing (we're streaming a file)
export const config = {
  api: {
    bodyParser: false,
  },
};
