const express = require('express');
const router = express.Router();
const seedRoutes = require('./seedRoutes');
const diceRoutes = require('./diceRoutes');

router.use('/', seedRoutes);
router.use('/', diceRoutes);

module.exports = router;