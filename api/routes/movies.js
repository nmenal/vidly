const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController')

// Movies List
router.get('/', movieController.find)

// Find a movie by id 
router.get('/:id', movieController.findById)

// Add a movie
router.post('/', movieController.createMovie)

// Update a movie
router.put('/:id', movieController.updateMovie)

// Delete a movie
router.delete('/:id', movieController.deleteMovie)

module.exports = router;