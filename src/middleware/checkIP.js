// Get config 
const config = require('../../config.json');

// For responses
const messages = require('../util/messages.json');

// Define util functions
const util = require('../util/index.js');
const logger = require('../util/logger.js');

// Define router
const { Router } = require('express');
const router = new Router();

// Middleware creation
router.use(async (req, res, next) => {
  // Check if they match
  if (await util.parseIP(req.ip) !== config.mainIP) {
    // Warn and return if they don't
    logger.warn('Failed IP check from', await util.parseIP(req.ip));
    res.status(401).json({
      success: false,
      message: messages.FAILED_AUTH,
    });
    return;
  }
  // Log if they do
  logger.debug('Passed IP check from', await util.parseIP(req.ip));
  // Go to next route
  next();
});

// Export
module.exports = router;