const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();

const app = express();

app.use(express.json());



// const movies = [
//     { id: 1, title: 'movie1' },
//     { id: 2, title: 'movie2' },
//     { id: 3, title: 'movie3' },
// ]


function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(2).required()
    });


    // check if movie validates fields, or return 400 invalid

    return schema.validate(movie);
}


router.get('/', (req, res) => {
    res.send('Hello world');
});

router.get('/movies/', (req, res) => {
    res.send(movies);
});


router.get('/movies/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) { //404
       return res.status(404).send('The movie with the given id was not found')
    }
    res.send(movie);
});


router.post('/movies', (req, res) => {

    const { error } = validateMovie(req.body);
   
    // if field missing return 400
    if (error) {
        return res.status(400).send(error.details[0].message);
        
    }

    const movie = {
        id: movies.length + 1,
        title: req.body.title
    };
    movies.push(movie);
    res.send(movie);
});


router.put('/movies/:id', (req, res) => {

    // check if movie exists, or return 404 doesn't exist
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) { //404
        return res.status(404).send('The movie with the given id was not found')
    }

    const { error } = validateMovie(req.body);
   
    if (error) {
       return res.status(400).send(error.details[0].message);
    }

    // update movie if no errors
    movie.title = req.body.title;
    res.send(movie);
});




router.delete('/movies/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) { //404
        return res.status(404).send('The movie with the given id was not found')
    }

    const index = movies.indexOf(movie); //take index in array to find
    movies.splice(index, 1);    // delete movie from array

    res.send(movie);
});


module.exports = router;