const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = []


router.get('/', (req,res) =>{
    res.send(genres);
})

router.get('/:id', (req,res) =>{
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('Not found genre with given Id !');
    res.send(genre);
})

router.post('/', (req,res) => {
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    const { error } = validateGenre(req.body);
    if (error) return res.send(error.details[0].message);
    genres.push(genre);
    res.send(genre);
    
});


router.put('/:id', (req,res) => {

    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('No such item with given id');

    const {error} = validateGenre(req.body);    
    if(error) return res.send(error.details[0].message);

    genre.name = req.body.name
    res.send(genre) 

})


router.delete('/:id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(parseInt(req.params.id)))
    console.log(genres);
    
    console.log("genre :",genre)
    console.log("parseInt(req.params.id) :",parseInt(req.params.id))
    if(!genre) return res.status(404).send('No such item with given id');
    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
})


function validateGenre(genre) {

    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genre,schema);
}


module.exports = router;
