// generateSecretKey.js

const fs = require('fs');
const crypto = require('crypto');

// Generate a random string of 64 bytes
const secretKey = crypto.randomBytes(32).toString('hex');

// Write the secret key to a .env file
fs.writeFileSync('.env', `JWT_SECRET_KEY=${secretKey}\n`);

console.log('Generated and saved secret key in .env file.');
