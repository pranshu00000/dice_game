const validateRollDiceInput = (req, res, next) => {
    const { betAmount, clientSeed, currentBalance } = req.body;
    
    if (!betAmount || !clientSeed || currentBalance === undefined) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    next();
  };
  
  const validateVerifyInput = (req, res, next) => {
    const { serverSeed, clientSeed, nonce } = req.body;
    
    if (!serverSeed || !clientSeed || nonce === undefined) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    next();
  };
  
  module.exports = {
    validateRollDiceInput,
    validateVerifyInput
  };