const express = require('express');

const app = express();

app.use(express.json());

const movies = [
    { id: 1, name: 'movie1'},
    { id: 2, name: 'movie2'},
    { id: 3, name: 'movie3'},
]

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/movies/', (req, res) => {
    res.send(courses);
});


app.post('/api/movies', (req, res) => {
    const movie = {
        id: movies.length + 1,
        title: req.body.title
    };
    movies.push(movie);
    res.send(movie);
})






app.get('/api/movies/:id', (req, res) => {
    const movies = movies.find(c => c.id === parseInt(req.params.id));
    if(!movies) { //404
        res.status(404).send('The movie with the given id was not found')
    }
    res.send(movies);
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));