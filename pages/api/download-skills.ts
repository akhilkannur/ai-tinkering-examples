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

  // Set response headers for file download
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename=real-ai-examples-master-skills.zip');
  res.setHeader('Cache-Control', 'no-cache');

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
 * Validate order with Dodo Payments
 * 
 * Uses Dodo API to verify the order exists and is paid
 */
async function validateAccess(order?: string, token?: string): Promise<boolean> {
  // If neither provided, invalid
  const accessValue = order || token;

  if (!accessValue || accessValue.length < 5) {
    return false;
  }

  // Check if Dodo API key is configured
  const dodoApiKey = process.env.DODO_PAYMENTS_API_KEY;
  
  if (!dodoApiKey) {
    // No API key - allow all for testing
    console.warn('DODO_PAYMENTS_API_KEY not set. Allowing all downloads for testing.');
    return true;
  }

  // Development mode: Allow test orders starting with "test_"
  if (process.env.NODE_ENV === 'development' && accessValue.startsWith('test_')) {
    console.log('Dev mode: Allowing test order:', accessValue);
    return true;
  }

  try {
    // Validate with Dodo Payments API
    const response = await fetch(
      `https://api.dopayments.com/orders/${accessValue}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${dodoApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Dodo API validation failed:', response.status);
      return false;
    }

    const orderData = await response.json();

    // Check if order is for the right product and is paid
    const isPaid = orderData.status === 'paid' || orderData.status === 'completed';
    const isCorrectProduct = orderData.product_id === 'H8Dq5SsZez55ciRh.oQxh6KivD4IKCwg0ZNa00En53kQDKIPfxuyRu3izJ5p_qwoT';

    if (!isPaid) {
      console.warn('Order not paid:', accessValue, orderData.status);
      return false;
    }

    if (!isCorrectProduct) {
      console.warn('Wrong product:', accessValue, orderData.product_id);
      return false;
    }

    console.log('Order validated successfully:', accessValue);
    return true;

  } catch (error) {
    console.error('Order validation error:', error);
    return false;
  }
}

// Disable body parsing (we're streaming a file)
export const config = {
  api: {
    bodyParser: false,
  },
};
