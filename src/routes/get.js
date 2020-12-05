// Get config
const config = require('../../config.json');

// Define util functions
const util = require('../util/index.js');
const logger = require('../util/logger.js');
const db = require('../util/db');

// To get the path
const path = require('path');

// Define router
const { Router } = require('express');
const router = new Router();

// GET /get/id
router.get('/:id', (req, res) => {
  let fileDoc = db.getFile(req.params.id);
  res.header("Content-Type", fileDoc.mimetype);
  res.sendFile(path.resolve('files', fileDoc.path));
  return;
});

// Export
module.exports = router;