// Define util functions
const logger = require('../util/logger.js');
const fileModel = require('../models/file.js');

// For responses
const messages = require('../util/messages.json');

// For deleting files
const fs = require('fs');
const path = require('path');

// Define router
const { Router } = require('express');
const router = new Router();

// GET /delete/id
router.get('/:id', async (req, res) => {
  // Get file's data
  let fileData;
  try {
    fileData = await fileModel.findOne({ id: req.params.id });
    logger.debug('Got file', req.params.id, 'from DB');
  } catch (err) {
    // If error occurs when retreiving from DB, return 500 (Internal Server Error)
    if (err) {
      logger.error('Getting', req.params.id, 'from DB failed');
      logger.error(err);
      res.status(500).json({
        success: false,
        message: messages.INTERNAL_ERROR,
        fix: messages.TRY_AGAIN
      });
      return;
    }
  }
  // Check if file's data exists, if not return
  if (!fileData) return res.json({
    success: false,
    message: messages.FILE_NOT_EXISTS_DB,
    fix: messages.USE_DIFF_ID
  });
  // Get the file's path
  let filePath = path.resolve('files', fileData.path);
  // If it exists, delete the file
  if (fs.existsSync(filePath)) fs.unlink(filePath, async (err) => {
    if (err) {
      logger.error('Deleting', req.params.id, 'from disk failed');
      logger.error(err);
      res.status(500).json({
        success: true,
        message: messages.INTERNAL_ERROR,
        fix: messages.TRY_AGAIN
      });
      return;
    }
    logger.debug('Deleted file', req.params.id, 'from disk');
    // Delete the file from the DB
    try {
      await fileModel.deleteOne(fileData);
      logger.debug('Deleted file', req.params.id, 'from db');
    } catch (err) {
      // If error occurs when retreiving from DB, return 500 (Internal Server Error)
      if (err) {
        logger.error('Deleting', req.params.id, 'from DB failed');
        logger.error(err);
        res.status(500).json({
          success: true,
          message: messages.DELETED_DB_NOT_DISK,
          fix: messages.TRY_AGAIN
        });
        return;
      }
    }
    logger.log('Deleted file', req.params.id);
    res.status(200).json({
      success: true,
      message: messages.DELETED_SUCCESS
    });
    return;

  });
});

// Export
module.exports = router;