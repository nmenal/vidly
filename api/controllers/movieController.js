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
    try {
        const movie = await Movie.findById({ _id: req.params.id }, function (err, movie) {
            if (err) return err
            else return movie
        }).exec()
        if (!movie) return res.status(404).send('Not found movie with given Id !');
        else res.send(movie);
    } catch (error) {
        return error
    }
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
    try {
        // movie.Validate()
        const result = await movie.save();
        if (!result) res.status(404).send("couldn't add the movie");
        else res.send(result);
    } catch (error) {
        console.log("error :",error);
        res.status(404).send(error.message);
    }
}

// Update a movie
module.exports.updateMovie = async (req, res, next) => {
    const { error } = Validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');
  
    console.log(genre)
    
    try {
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
    } catch (error) {
        res.send(error)
    }
}

// Delete a movie
module.exports.deleteMovie = async (req, res, next) => {
    const movie = await Movie.findByIdAndRemove({ _id: req.params.id });
    if (!movie) return res.status(404).send("couldn't add the movie");
    else res.send(movie);
}