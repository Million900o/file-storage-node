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
  // Get file's data
  let fileData;
  try {
    fileData = await fileModel.findOne({ id: req.params.id });
    logger.debug('Retrieved file', req.params.id, 'from DB');
  } catch (err) {
    // If error occurs when retreiving from DB, return 500 (Internal Server Error)
    if (err) {
      logger.error('Getting', req.params.id, 'from DB failed');
      logger.error(err);
      req.status(500).json({
        success: false,
        message: "Internal Server Error",
        fix: "Try again later."
      });
      return;
    }
  }
  // Check if file's data exists, if not return
  if (!fileData) return res.json({
    success: false,
    message: "File does not exist.",
    fix: "Use a different ID."
  });
  // Set headers of Content-Type to mime-type of file and send file
  res.header('Content-Type', fileData.mimetype);
  res.sendFile(path.resolve('files', fileData.path));
  logger.log('Sent file', req.params.id);
  return;
});

// Export
module.exports = router;