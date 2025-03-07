const diceGameModel = require('../models/diceGame');
const { generateRoll, isWinningRoll } = require('../services/gameService');
const errorHandler = require('../utils/errorHandler');

const rollDice = (req, res) => {
  try {
    const { betAmount, clientSeed, nonce, currentBalance } = req.body;
  
    // Parse bet amount and current balance
    const bet = parseInt(betAmount);
    const balance = parseInt(currentBalance);
  
    // Get current server seed
    const serverSeed = diceGameModel.getCurrentServerSeed();
  
    // Generate roll
    const roll = generateRoll(serverSeed, clientSeed, nonce);
  
    // Determine if the player won
    const won = isWinningRoll(roll);
  
    // Calculate new balance
    const balanceChange = won ? bet : -bet;
    const newBalance = balance + balanceChange;
  
    // Rotate the seed for next rounds
    diceGameModel.rotateSeed();
  
    // Return the result
    res.json({
      roll,
      won,
      newBalance,
      serverSeed: diceGameModel.previousServerSeed
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const verifyRoll = (req, res) => {
  try {
    const { serverSeed, clientSeed, nonce } = req.body;
  
    // Generate roll using the provided seeds
    const roll = generateRoll(serverSeed, clientSeed, nonce);
  
    // Return verification result
    res.json({
      roll,
      won: isWinningRoll(roll),
      serverSeedHash: require('../services/cryptoService').hashSeed(serverSeed),
      combinedData: `${serverSeed}-${clientSeed}-${nonce}`
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  rollDice,
  verifyRoll
};