const diceGameModel = require('../models/diceGame');

const getNewSeed = (req, res) => {
  const seedInfo = diceGameModel.getServerSeedInfo();
  res.json(seedInfo);
};

module.exports = {
  getNewSeed
};