const fs = require('fs');
const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync('.env.local'));

// Ensure keys are loaded from environment if not in .env.local
envConfig.X_API_KEY = process.env.X_API_KEY || envConfig.X_API_KEY;
envConfig.X_API_KEY_SECRET = process.env.X_API_KEY_SECRET || envConfig.X_API_KEY_SECRET;
envConfig.X_ACCESS_TOKEN = process.env.X_ACCESS_TOKEN || envConfig.X_ACCESS_TOKEN;
envConfig.X_ACCESS_TOKEN_SECRET = process.env.X_ACCESS_TOKEN_SECRET || envConfig.X_ACCESS_TOKEN_SECRET;
envConfig.X_CLIENT_ID = process.env.X_CLIENT_ID || envConfig.X_CLIENT_ID;
envConfig.X_CLIENT_SECRET_ID = process.env.X_CLIENT_SECRET_ID || envConfig.X_CLIENT_SECRET_ID;

const newEnv = Object.entries(envConfig)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

fs.writeFileSync('.env', newEnv);
console.log('✅ .env updated successfully');
