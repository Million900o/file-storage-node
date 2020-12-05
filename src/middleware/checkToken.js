// Get config 
const config = require('../../config.json');

// Define util functions
const util = require('../util/index.js');
const logger = require('../util/logger.js');

// Define router
const { Router } = require('express');
const router = new Router();

// Middleware creation
router.use(async (req, res, next) => {
  if (req.headers.token !== config.token) {
    logger.warn('Failed Token check from:', await util.parseIP(req.ip));
    res.status(200).end();
    return;
  }
  logger.debug('Passed Token check from:', await util.parseIP(req.ip));
  next();
});

// Export
module.exports = router;