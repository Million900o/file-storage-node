// Define util functions
const logger = require('../util/logger.js');
const fileModel = require('../models/file.js');

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
      message: "No file was sent.",
      fix: "Send a file in the request."
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
        logger.error(err);
        res.status(500).json({
          success: false,
          message: "An unknown error has occured.",
          fix: "Try again."
        });
        return;
      } else {
        // Define the object
        let fileObject = {
          id: fileID,
          name: req.files.file.name,
          mimetype: req.files.file.mimetype,
          path: filePath,
          date: new Date().toLocaleString()
        };
        // Create the file in the DB with the object
        await fileModel.create(fileObject);
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