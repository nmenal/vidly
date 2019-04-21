const { Movie, Validate } = require('../models/movie');
const { Genre } = require('../models/genre');
// Movies List
module.exports.find = async (req, res, next) => {
    const movies = await Movie.find();
    console.log(movies)
    if (!movies) return res.status(404).send("No items found");
    else res.send(movies)
}

// Find a movie by id 
module.exports.findById = async (req, res, next) => {
    const movie = await Movie.findById({ _id: req.params.id }, function (err, movie) {
        if (err) return err
        else return movie
    }).exec()
    if (!movie) return res.status(404).send('Not found movie with given Id !');
    res.send(movie);
}

// Add a movie
module.exports.createMovie = async (req, res, next) => {
    const { error } = Validate(req.body)
    if (error) return error.details[0].message;

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.send('Invalid genre ..');

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    // movie.Validate()
    const result = await movie.save();
    if (!result) res.status(404).send("couldn't add the movie");
    res.send(result);
}

// Update a movie
module.exports.updateMovie = async (req, res, next) => {
    const { error } = Validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    console.log(genre)
    const movie = await Movie.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, { new: true });

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
}

// Delete a movie
module.exports.deleteMovie = async (req, res, next) => {
    const movie = await Movie.findByIdAndRemove({ _id: req.params.id });
    if (!movie) return res.status(404).send("couldn't add the movie");
    else res.send(movie);
}