const crypto = require('crypto');

// Generate a random seed
const generateRandomSeed = (length = 64) => {
  return crypto.randomBytes(32).toString('hex');
};

// Hash a seed using SHA-256
const hashSeed = (seed) => {
  return crypto.createHash('sha256').update(seed).digest('hex');
};

module.exports = {
  generateRandomSeed,
  hashSeed
};
