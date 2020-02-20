const Joi = require('@hapi/joi');
const express = require('express');

const app = express();

app.use(express.json());

const movies = [
    { id: 1, name: 'movie1' },
    { id: 2, name: 'movie2' },
    { id: 3, name: 'movie3' },
]

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/movies/', (req, res) => {
    res.send(courses);
});


app.post('/api/movies', (req, res) => {

    const schema = Joi.object({
        title: Joi.string().min(2).required()
    });

    const result = schema.validate(req.body);


    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const movie = {
        id: movies.length + 1,
        title: req.body.title
    };
    movies.push(movie);
    res.send(movie);
});


app.put('/api/movies/:id', (req, res) => {

    // check if movie exists, or return 404 doesn't exist
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) { //404
        res.status(404).send('The movie with the given id was not found')
    }

    const schema = Joi.object({
        title: Joi.string().min(2).required()
    });


    // check if movie validates fields, or return 400 invalid

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // update movie if no errors
    movie.title = req.body.title;
    res.send(movie);
})






app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) { //404
        res.status(404).send('The movie with the given id was not found')
    }
    res.send(movie);
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));