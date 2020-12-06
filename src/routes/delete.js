// Define util functions
const logger = require('../util/logger.js');
const fileModel = require('../models/file.js');

// For deleting files
const fs = require('fs');
const path = require('path');

// Define router
const { Router } = require('express');
const router = new Router();

// GET /delete/id
router.get('/:id', async (req, res) => {
  let fileData = await fileModel.findOne({ id: req.params.id });
  if (!fileData) return res.json({
    success: false,
    message: 'File does not exist in DB',
    fix: 'Use a different ID'
  });
  let filePath = path.resolve('files', fileData.path);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  logger.log('Deleted file', req.params.id);
  await fileModel.deleteOne(fileData);
  res.json({
    success: true,
    message: 'Successfully deleted the file.'
  });
  return;
});

// Export
module.exports = router;