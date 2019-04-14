const express = require('express');
const router = express.Router();
const Joi = require('joi');
const genreController = require('../controllers/genreController');

router.get('/', (req, res) => {
    genreController.getGenres()
        .then((result) => res.send(result))
        .catch((err) => res.status(404).send(err));
});

router.get('/:id', (req, res) => {
    genreController.findById(req.params.id)
        .then((g) => {
            console.log(g)
            if(g) res.send(g)
            else res.status(404).send('Not found genre with given Id !')
        })
        .catch((err) => {
            console.log(err)
        })
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.send(error.details[0].message);
    genreController.createGenre(req.body.name)
        .then((result) => res.send(result))
        .catch((err) => {
            console.log("err :", err);
            res.status(404).send(err.message);
        })
});

router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('No such item with given id');

    const { error } = validateGenre(req.body);
    if (error) return res.send(error.details[0].message);

    genre.name = req.body.name
    res.send(genre)
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(parseInt(req.params.id)))
    if (!genre) return res.status(404).send('No such item with given id');
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});


function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}

module.exports = router;
