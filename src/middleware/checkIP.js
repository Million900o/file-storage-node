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
  if (await util.parseIP(req.ip) !== config.mainIP) {
    logger.warn('Failed IP check from', await util.parseIP(req.ip));
    res.status(200).end();
    return;
  }
  logger.debug('Passed IP check from', await util.parseIP(req.ip));
  next();
});

// Export
module.exports = router;