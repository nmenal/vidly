const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
    .then(()=>console.log(' Connected to Vidly DB ..'))
    .catch(()=>console.log(' Cannot connecte to Vidly DB ..'));


const GenreSchema = new mongoose.Schema({
    name: String
});

const Genre = mongoose.model('Genre',GenreSchema);

module.exports = Genre;

