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



app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});