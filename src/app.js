// Get config
const config = require('../config.json');
const port = config.port || 3000;

// Define Express
const express = require('express');

// MongoDB
const mongoose = require('mongoose');
mongoose.connect(config.mongo.connectURI, config.mongo.connectOptions);

// Define server
const app = express();

// Util
const logger = require('./util/logger.js');

// Middleware
const checkToken = require('./middleware/checkToken.js');
const checkIP = require('./middleware/checkIP.js');

// Routers
const getFile = require('./routes/get.js');
const saveFile = require('./routes/save.js');
const deleteFile = require('./routes/delete.js');

// Routes
app.use(['/get/', '/get'], checkIP, checkToken, getFile);
app.use('/save', checkIP, checkToken, saveFile);
app.use('/delete', checkIP, checkToken, deleteFile);

// 404?
app.use('*', (req, res) => res.status(200).end('How did you get here?'));

// Start Server
app.listen(port, () => {
  // Log when started
  logger.log("File Node started");
});
