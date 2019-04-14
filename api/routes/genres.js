const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

router.get('/', (req, res) => {
    genreController.getGenres()
        .then((result) => res.send(result))
        .catch((err) => res.status(404).send(err));
});

router.get('/:id', (req, res) => {
    genreController.findById(req.params.id)
        .then((g) => {
            if(g) res.send(g)
            else res.status(404).send('Not found genre with given Id !')
        })
        .catch((err) => {
            res.status(404).send(err.message);
        })
});

router.post('/', (req, res) => {
    genreController.createGenre(req.body)
        .then((result) => res.send(result))
        .catch((err) => {
            res.status(404).send(err.message);
        })
});

router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('No such item with given id');

    const { error } = validate(req.body);
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

module.exports = router;
