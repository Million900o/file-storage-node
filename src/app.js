// Get config
const config = require('../config.json');
const port = config.port || 3000;

// Define Express
const express = require('express');

// Define server
const app = express();

// Util
const logger = require('./util/logger.js');

// Middleware
const checkID = require('./middleware/checkID.js');
const checkIP = require('./middleware/checkIP.js');

// Routers
const getFile = require('./routes/get.js');
const saveFile = require('./routes/save.js');
const deleteFile = require('./routes/delete.js');

// Routes
app.use('/get', checkIP, checkID, getFile);
app.use('/save', checkIP, checkID, saveFile);
app.use('/delete', checkIP, checkID, deleteFile);

// 404?
app.use('*', (req, res) => res.status(200).end('How did you get here?'));

// Start Server
app.listen(port, () => {
  logger.log("File Node started");
});