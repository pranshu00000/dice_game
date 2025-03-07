const crypto = require('crypto');

// Generate a roll between 1-6 based on seeds and nonce
const generateRoll = (serverSeed, clientSeed, nonce) => {
  // Combine server seed, client seed and nonce
  const combinedString = `${serverSeed}-${clientSeed}-${nonce}`;
 
  // Create a SHA-256 hash of the combined string
  const hash = crypto.createHash('sha256').update(combinedString).digest('hex');
 
  // Take the first 8 characters of the hash and convert to a decimal number
  const decimalValue = parseInt(hash.substring(0, 8), 16);
 
  // Map the large decimal to a number between 1 and 6
  // Using modulo 6 + 1 to get a fair distribution
  return (decimalValue % 6) + 1;
};

// Check if the roll is a winner (4, 5, or 6)
const isWinningRoll = (roll) => {
  return roll >= 4;
};

module.exports = {
  generateRoll,
  isWinningRoll
};