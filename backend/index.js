// const express = require('express');
// const crypto = require('crypto');
// const bodyParser = require('body-parser');
// const cors = require('cors'); 
// const app = express();

// //Middleware
// app.use(bodyParser.json());
// app.use(express.static('public'));
// app.use(cors())
// // Store server seeds (in a real app, you'd use a database)
// let serverSeed = generateRandomSeed();
// let serverSeedHash = hashSeed(serverSeed);
// let previousServerSeed = null;
// let previousServerSeedHash = null;

// // Generate a random seed
// function generateRandomSeed(length = 64) {
//   return crypto.randomBytes(32).toString('hex');
// }

// // Hash a seed using SHA-256
// function hashSeed(seed) {
//   return crypto.createHash('sha256').update(seed).digest('hex');
// }

// // Generate a roll between 1-6 based on seeds and nonce
// function generateRoll(serverSeed, clientSeed, nonce) {
//   // Combine server seed, client seed and nonce
//   const combinedString = `${serverSeed}-${clientSeed}-${nonce}`;
  
//   // Create a SHA-256 hash of the combined string
//   const hash = crypto.createHash('sha256').update(combinedString).digest('hex');
  
//   // Take the first 4 characters of the hash and convert to a decimal number
//   const decimalValue = parseInt(hash.substring(0, 8), 16);
  
//   // Map the large decimal to a number between 1 and 6
//   // Using modulo 6 + 1 to get a fair distribution
//   return (decimalValue % 6) + 1;
// }

// // Check if the roll is a winner (4, 5, or 6)
// function isWinningRoll(roll) {
//   return roll >= 4;
// }

// // API endpoint to get a new server seed hash
// app.get('/api/new-seed', (req, res) => {
//   res.json({
//     serverSeedHash,
//     previousServerSeed,
//     previousServerSeedHash
//   });
// });

// // API endpoint to handle dice roll
// app.post('/api/roll-dice', (req, res) => {
//   const { betAmount, clientSeed, nonce, currentBalance } = req.body;
  
//   // Validate all inputs
//   if (!betAmount || !clientSeed || currentBalance === undefined) {
//     return res.status(400).json({ error: 'Missing required parameters' });
//   }
  
//   // Parse bet amount and current balance
//   const bet = parseInt(betAmount);
//   const balance = parseInt(currentBalance);
  
//   // Generate roll
//   const roll = generateRoll(serverSeed, clientSeed, nonce);
  
//   // Determine if the player won
//   const won = isWinningRoll(roll);
  
//   // Calculate new balance
//   const balanceChange = won ? bet : -bet;
//   const newBalance = balance + balanceChange;
  
//   // Save the previous seed for verification
//   previousServerSeed = serverSeed;
//   previousServerSeedHash = serverSeedHash;
  
//   // Generate a new server seed for next rounds
//   serverSeed = generateRandomSeed();
//   serverSeedHash = hashSeed(serverSeed);
  
//   // Return the result
//   res.json({
//     roll,
//     won,
//     newBalance,
//     serverSeed: previousServerSeed
//   });
// });

// // Verification endpoint to manually check if a roll was fair
// app.post('/api/verify', (req, res) => {
//   const { serverSeed, clientSeed, nonce } = req.body;
  
//   if (!serverSeed || !clientSeed || nonce === undefined) {
//     return res.status(400).json({ error: 'Missing required parameters' });
//   }
  
//   // Generate roll using the provided seeds
//   const roll = generateRoll(serverSeed, clientSeed, nonce);
  
//   // Return verification result
//   res.json({
//     roll,
//     won: isWinningRoll(roll),
//     serverSeedHash: hashSeed(serverSeed),
//     combinedData: `${serverSeed}-${clientSeed}-${nonce}`
//   });
// });

// // Catch-all route for SPA
// // app.get('*', (req, res) => {
// //   res.sendFile('index.html', { root: 'public' });
// // });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

// API Routes
app.use('/api', apiRoutes);

// Catch-all route for SPA (commented out in original but included here)
// app.get('*', (req, res) => {
//   res.sendFile('index.html', { root: 'public' });
// });

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});