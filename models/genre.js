const mongoose = require('mongoose');
const Joi = require('joi');

const GenreSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        minlength:5,
        maxlength:50
    }
});

const Genre = mongoose.model('Genre',GenreSchema);

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    }
    return Joi.validate(genre, schema);
}

module.exports.Genre = Genre;
module.exports.GenreSchema = GenreSchema;
module.exports.validate = validateGenre;

