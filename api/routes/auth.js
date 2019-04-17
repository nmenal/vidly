const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { asyncMiddleware } = require('../middleware/async');

router.post('/', asyncMiddleware(authController.login));

module.exports = router;