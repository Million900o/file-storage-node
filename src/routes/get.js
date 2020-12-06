// Define util functions
const logger = require('../util/logger.js');
const fileModel = require('../models/file.js');

// To get the path
const path = require('path');

// Define router
const { Router } = require('express');
const router = new Router();

// GET /get/id
router.get('/:id', async (req, res) => {
  let fileData = await fileModel.findOne({ id: req.params.id });
  if (!fileData) return res.json({
    success: false,
    message: 'File does not exist.',
    fix: 'Use a different ID.'
  });
  res.header("Content-Type", fileData.mimetype);
  res.sendFile(path.resolve('files', fileData.path));
  logger.log('Sent file', req.params.id);
  return;
});

// Export
module.exports = router;