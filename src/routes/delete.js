// Get config
const config = require('../../config.json');

// Define util functions
const util = require('../util/index.js');
const logger = require('../util/logger.js');

// Define router
const { Router } = require('express');
const router = new Router();

// GET /delete/id
router.get('/:id', (req, res) => {

});

// Export
module.exports = router;