// Get config
const config = require('../../config.json');

// Define util functions
const util = require('../util/index.js');
const logger = require('../util/logger.js');
const db = require('../util/db.js');

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
router.post('/', (req, res) => {
  if (!req.files?.file) {
    res.status(400).json({
      success: false,
      message: 'No file was sent.',
      fix: 'Send a file in the request.'
    });
    return;
  } else {
    let date = new Date();
    let dateString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}/`;
    let fileID = Date.now();
    let filePath = dateString + fileID;
    req.files.file.mv(`./files/${filePath}`, (err) => {
      if (err) {
        logger.error(err);
        res.status(500).json({
          success: false,
          message: 'An unknown error has occured.',
          fix: 'Try again.'
        });
        return;
      } else {
        let fileObject = {
          id: fileID,
          name: req.files.file.name,
          mimetype: req.files.file.mimetype,
          path: filePath,
          date: new Date().toLocaleString()
        };
        db.saveFile(fileID, fileObject);
        res.status(200).json({
          success: true,
          id: fileID
        });
        return;
      }
    });
  }

});

// Export
module.exports = router;