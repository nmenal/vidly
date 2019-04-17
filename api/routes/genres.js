const express = require('express');
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const { asyncMiddleware } = require('../middleware/async');
const router = express.Router();
const genreController = require('../controllers/genreController');

router.get('/', asyncMiddleware(genreController.getGenres));

router.get('/:id', asyncMiddleware(genreController.findById));

router.post('/', auth, asyncMiddleware(genreController.createGenre));

router.put('/:id', asyncMiddleware(genreController.updateGenre));

router.delete('/:id', [auth, admin], asyncMiddleware(genreController.deleteGenre));

module.exports = router;
