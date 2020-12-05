// Get config
const config = require('../../config.json');

// Define util functions
const util = require('../util/index.js');
const logger = require('../util/logger.js');
const db = require('../util/db.js');

// For deleting files
const fs = require('fs');
const path = require('path');

// Define router
const { Router } = require('express');
const router = new Router();

// GET /delete/id
router.get('/:id', (req, res) => {
  let fileDoc = db.getFile(req.params.id);
  if (!fileDoc) return res.json({
    success: false,
    message: 'File does not exist in DB',
    fix: 'Use a different ID'
  });
  let filePath = path.resolve('files', fileDoc.path);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  logger.debug('Deleted file', req.params.id);
  db.deleteFile(req.params.id);
  res.json({
    success: true,
    message: 'Successfully deleted the file.'
  });
  return;
});

// Export
module.exports = router;