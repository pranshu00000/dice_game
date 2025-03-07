const express = require('express');
const router = express.Router();
const { rollDice, verifyRoll } = require('../controllers/diceController');
const { validateRollDiceInput, validateVerifyInput } = require('../middleware/validation');

router.post('/roll-dice', validateRollDiceInput, rollDice);
router.post('/verify', validateVerifyInput, verifyRoll);

module.exports = router;