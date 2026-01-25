const fs = require('fs');
const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync('.env'));

envConfig.X_API_KEY = '4nTXsNXnI1wiWuAndJ4EhpHaS';
envConfig.X_API_KEY_SECRET = 'hCGAT2eDB4ZEheglXQMJf73gUshWgHgujAT6gJ6wnrY7xKaLxk';
envConfig.X_ACCESS_TOKEN = '1972178357526663168-6BDUcNUxdB4sUXn87qD9tL6Suhljr2';
envConfig.X_ACCESS_TOKEN_SECRET = 'YEg8i4mDe4Kvx43cCtNsFPKqNgZedrrrWwI04GUMn3qKM';
envConfig.X_BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAGXP7AEAAAAApnhqfYSts%2BE06%2FtnUKcMrct%2FStA%3D1PmAW74GWfUbUDC00CZeOzgAodxoNHfNLS9gqudX5gDthD4oDu';
envConfig.X_CLIENT_SECRET_ID = 'IIj4SQ5r3Bu3Ucb_huMjvQw_dKTulBLEA2--rAliRFjSGKGc_p';

const newEnv = Object.entries(envConfig)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

fs.writeFileSync('.env', newEnv);
console.log('✅ .env updated successfully');
