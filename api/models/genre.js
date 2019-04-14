const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect('mongodb://localhost/vidly')
    .then(()=>console.log(' Connected to Vidly DB ..'))
    .catch(()=>console.log(' Cannot connecte to Vidly DB ..'));


const GenreSchema = new mongoose.Schema({
    name: String
});

const Genre = mongoose.model('Genre',GenreSchema);

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}


module.exports.Genre = Genre;
module.exports.validate = validateGenre;

