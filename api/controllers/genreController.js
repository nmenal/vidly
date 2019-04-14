const Genre = require('../models/genre');

// Find genres 
module.exports.getGenres = async function getGenres() {
    try {
        return await Genre.find();
    } catch (error) {
        return error;
    }
}

// FindById 
module.exports.findById = async function findById(id) {
    try {
        return await Genre.findById({_id:id}, function (err, genre) {
            if (err) return err
            else return genre
        }).exec();
    } catch (error) {
        return error;
    }
}

// Create genre 
module.exports.createGenre = async function createGenre(name) {
    const genre = new Genre({
        name: name,
    })
    try {
        await genre.validate();
        return await genre.save();
    } catch (error) {
        return error;
    }
}
