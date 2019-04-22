const { Genre, validate } = require('../models/genre');

// Find genres 
module.exports.getGenres = async (req, res, next) => {
    const genres = await Genre.find();
    if (!genres) return res.status(404).send("No items found");
    res.send(genres);
}

// FindById 
module.exports.findById = async (req, res, next) => {
    const genre = await Genre.findById({ _id: req.params.id }, function (err, genre) {
        if (err) return err
        else return genre
    }).exec();
    if (!genre) return res.status(404).send('Not found genre with given Id !');
    res.send(genre);
}

// Create genre 
module.exports.createGenre = async (req, res, next) => {

    const token = req.header('x-auth-token');
    if(!token ) return res.status(401).send();

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = new Genre({
        name: req.body.name
    })
    await genre.validate();
    const result = await genre.save();
    if (!result) return res.status(404).send("couldn't add the genre");
    res.send(result);
}

// Update genre 
module.exports.updateGenre = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name }, {
        new: true
    });
    if (!genre) return res.status(404).send('No such item with given id');
    
    res.send(genre);
}

// Delete genre 
module.exports.deleteGenre = async (req, res, next) => {
    const genre = await Genre.findByIdAndRemove({ _id: req.params.id });
    if (!genre) return res.status(404).send('No such item with given id');
    res.send(genre);
}