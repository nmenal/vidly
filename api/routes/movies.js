const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController')
const { asyncMiddleware } = require('../middleware/async');

// Movies List
router.get('/', asyncMiddleware(movieController.find));

// Find a movie by id 
router.get('/:id', asyncMiddleware(movieController.findById));

// Add a movie
router.post('/', asyncMiddleware(movieController.createMovie));

// Update a movie
router.put('/:id', asyncMiddleware(movieController.updateMovie));

// Delete a movie
router.delete('/:id', asyncMiddleware(movieController.deleteMovie));

module.exports = router;