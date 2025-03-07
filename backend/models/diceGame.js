const { generateRandomSeed, hashSeed } = require('../services/cryptoService');

// In a real application, this would interact with a database
class DiceGameModel {
  constructor() {
    this.serverSeed = generateRandomSeed();
    this.serverSeedHash = hashSeed(this.serverSeed);
    this.previousServerSeed = null;
    this.previousServerSeedHash = null;
  }

  getServerSeedInfo() {
    return {
      serverSeedHash: this.serverSeedHash,
      previousServerSeed: this.previousServerSeed,
      previousServerSeedHash: this.previousServerSeedHash
    };
  }

  rotateSeed() {
    this.previousServerSeed = this.serverSeed;
    this.previousServerSeedHash = this.serverSeedHash;
    this.serverSeed = generateRandomSeed();
    this.serverSeedHash = hashSeed(this.serverSeed);
  }

  getCurrentServerSeed() {
    return this.serverSeed;
  }
}

module.exports = new DiceGameModel();