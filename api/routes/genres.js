const express = require('express');
const {auth} = require('../middleware/auth');
const router = express.Router();
const genreController = require('../controllers/genreController');

router.get('/', genreController.getGenres)

router.get('/:id', genreController.findById);

router.post('/', auth, genreController.createGenre);

router.put('/:id', genreController.updateGenre);

router.delete('/:id', genreController.deleteGenre);

module.exports = router;
