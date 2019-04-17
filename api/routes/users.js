const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');
const { asyncMiddleware } = require('../middleware/async');

router.get('/', asyncMiddleware(userController.getUsers));

router.get('/me', asyncMiddleware(auth, userController.findById));

router.post('/', asyncMiddleware(userController.createUser));

router.put('/:id', asyncMiddleware(userController.updateUser));

router.delete('/:id', asyncMiddleware(userController.deleteUser));

module.exports = router;