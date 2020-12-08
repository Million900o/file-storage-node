// Define util functions
const logger = require('../util/logger.js');
const fileModel = require('../models/file.js');

// For responses
const messages = require('../util/messages.json');

// Define router
const { Router } = require('express');
const router = new Router();

// Middleware for router
const fileUpload = require('express-fileupload');
router.use(fileUpload({
  createParentPath: true,
  safeFileNames: true,
  preserveExtension: true,
  useTempFiles: true,
  tempFileDir: './tmp',
}));

// POST /save
router.post('/', async (req, res) => {
  // Check if there is no file, and return if not
  if (!req.files?.file) {
    res.status(400).json({
      success: false,
      message: messages.FILE_NOT_SENT,
      fix: messages.SEND_FILE
    });
    return;
  } else {
    // Get the data sorted file path created
    let date = new Date();
    let dateString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`;
    let fileID = Date.now();
    let filePath = dateString + fileID;
    // Move the file
    req.files.file.mv(`./files/${filePath}`, async (err) => {
      // If error return 500 (Internal server error)
      if (err) {
        logger.error('Saving file', fileID, 'to the disk failed');
        logger.error(err);
        res.status(500).json({
          success: false,
          message: messages.UNKNOWN_ERROR,
          fix: messages.TRY_AGAIN
        });
        return;
      } else {
        logger.debug('Saved file', fileID, 'to the disk');
        // Define the object
        let fileObject = {
          id: fileID,
          name: req.files.file.name,
          mimetype: req.files.file.mimetype,
          path: filePath,
          date: new Date().toLocaleString()
        };
        // Create the file in the DB with the object
        try {
          await fileModel.create(fileObject);
          logger.debug('Saved file', fileID, 'to the DB');
        } catch (err) {
          // If error occurs when retreiving from DB, return 500 (Internal Server Error)
          if (err) {
            logger.error('Saving file', fileID, 'to the DB failed');
            logger.error(err);
            res.status(500).json({
              success: false,
              message: messages.INTERNAL_ERROR,
              fix: messages.TRY_AGAIN
            });
          }
        }
        // Return with status 200 (OK) and send file's ID
        res.status(200).json({
          success: true,
          id: fileID
        });
        logger.log('Saved file', fileID);
        return;
      }
    });
  }
});

// Export
module.exports = router;