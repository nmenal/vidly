const mongoose = require('mongoose');
const Joi = require('joi');
const { GenreSchema } = require('../models/genre');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to vidly Db ..'))
    .catch(() => console.log('Cannot connect to vidly Db ..'));

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    },
    genre: {
        type: GenreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
})

const Movie = mongoose.model('Movie', movieSchema)

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    }
    return Joi.validate(movie, schema)
}

module.exports.Movie = Movie;
module.exports.Validate = validateMovie;