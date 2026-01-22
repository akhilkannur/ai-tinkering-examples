const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

/**
 * Adds a beautiful frame/background to a screenshot
 * @param {string} inputPath - Path to the original screenshot
 * @param {string} outputPath - Path for the output beautiful screenshot
 */
async function beautifyScreenshot(inputPath, outputPath) {
  try {
    // Load the original screenshot
    const image = await loadImage(inputPath);
    
    // Calculate dimensions for the framed image
    const padding = 40;
    const shadowOffset = 10;
    const canvasWidth = image.width + (padding * 2) + shadowOffset;
    const canvasHeight = image.height + (padding * 2) + shadowOffset;
    
    // Create canvas
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');
    
    // Draw subtle gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, '#f0f9ff');
    gradient.addColorStop(1, '#e0f2fe');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    // Draw the image with a slight offset for the shadow effect
    ctx.drawImage(
      image, 
      padding + shadowOffset/2, 
      padding + shadowOffset/2, 
      image.width, 
      image.height
    );
    
    // Reset shadow for the border
    ctx.shadowColor = 'transparent';
    
    // Draw a subtle border
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.strokeRect(
      padding + shadowOffset/2 - 0.5, 
      padding + shadowOffset/2 - 0.5, 
      image.width + 1, 
      image.height + 1
    );
    
    // Save the beautiful screenshot
    const out = fs.createWriteStream(outputPath);
    const stream = canvas.createJPEGStream({ quality: 0.9 });
    
    stream.pipe(out);
    await new Promise((resolve, reject) => {
      out.on('finish', resolve);
      out.on('error', reject);
    });
    
    console.log(`✅ Beautiful screenshot saved to: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error('❌ Error beautifying screenshot:', error);
    throw error;
  }
}

// Export the function
module.exports = beautifyScreenshot;

// If running as a script
if (require.main === module) {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3] || inputPath.replace('.', '_beautiful.');
  
  if (!inputPath) {
    console.error('Please provide an input path');
    process.exit(1);
  }
  
  beautifyScreenshot(inputPath, outputPath)
    .catch(err => {
      console.error('Failed to beautify screenshot:', err);
      process.exit(1);
    });
}