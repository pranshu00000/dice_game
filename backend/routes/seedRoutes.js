const express = require('express');
const router = express.Router();
const { getNewSeed } = require('../controllers/seedController');

router.get('/new-seed', getNewSeed);

module.exports = router;