const Joi = require('@hapi/joi');
const express = require('express');
const mongoose = require('mongoose')
const Movie = require('../models/movie');

const router = express.Router();

const app = express();

app.use(express.json());


const movies = [
    // { id: 1, title: 'movie1' },
    // { id: 2, title: 'movie2' },
    // { id: 3, title: 'movie3' },
]


function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(2).required()
    });


    // check if movie validates fields, or return 400 invalid

    return schema.validate(movie);
}


router.get('/', (req, res, next) => {
    res.send('Hello world');


});

router.get('/movies/', (req, res, next) => {
    // if(movies.length > 0) res.send(movies);
    // else res.send('movies not found');

    Movie.find()
        .exec()
        .then(results => {
            if (Object.keys(results).length === 0) {
                res.status(404).json({ status: 404, message: 'No movie found' });
            }
            else {
                res.status(200).send(results);
            }
        })
        .catch(err => {
            res.status(500).json({ status: 500, message: err.message });
        })

});


router.get('/movies/:id', (req, res, next) => {
    // const movie = movies.find(c => c.id === parseInt(req.params.id));
    // if (!movie) { //404
    //    return res.status(404).send('The movie with the given id was not found')
    // }
    // res.send(movie);

    const id = req.params.id;
    Movie.findById(id)
        .then(result => {
            if (result) {
                res.status(200).send(result);
            }
            else {
                res.status(404).json({ status: 404, message: 'The provided ID does not match any movie' });
            }
        })
        .catch(err => {
            res.status(500).json({ status: 500, message: 'Invalid ID provided' });
        })
});


router.post('/movies', (req, res, next) => {

    // console.log(req.body);


    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        director: req.body.director,
        description: req.body.description,
        shortDescription: req.body.shortDescription,
        duration: req.body.duration,
        releaseDate: req.body.releaseDate,
        images: req.body.images,
        genre: req.body.genre,
        // genre: {
        //     id: req.body.genre.id,
        //     name: req.body.genre.name
        // },
        childrenFriendly: req.body.childrenFriendly
    });

    movie
        .save()
        .exec()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).json({ status: 500, message: err.message });
        })


    // const { error } = validateMovie(req.body);

    // if (error) {
    //     return res.status(400).send(error.details[0].message);

    // }

    // const movie = {
    //     id: movies.length + 1,
    //     title: req.body.title
    // };
    // movies.push(movie);
    // res.send(movie);
});


router.put('/movies/:id', (req, res, next) => {

    // Movie.findById(req.params.id, function (err, movie) {
    //     if (err) {
    //         return res.status(500).json({ status: 500, message: err.message });
    //     }
    //     movie.title = req.body.title;
    //     movie.director = req.body.director;
    //     movie.description = req.body.description;
    //     movie.shortDescription = req.body.shortDescription;
    //     movie.duration = req.body.duration;
    //     movie.releaseDate = req.body.releaseDate;
    //     movie.images = req.body.images;
    //     movie.genre = req.body.genre;
    //     movie.childrenFriendly = req.body.childrenFriendly;
    //     movie.save(function (err) {
    //         if (err) {
    //             return res.status(500).json({ status: 500, message: err.message });
    //         }
    //         res.status(200).send(movie);
    //     });
    // });

    const id = req.params.id;
    Movie.findById(id)
        .then(movie => {
            movie.title = req.body.title;
            movie.director = req.body.director;
            movie.description = req.body.description;
            movie.shortDescription = req.body.shortDescription;
            movie.duration = req.body.duration;
            movie.releaseDate = req.body.releaseDate;
            movie.images = req.body.images;
            movie.genre = req.body.genre;
            movie.childrenFriendly = req.body.childrenFriendly;
            movie.save()
                .then(result => {
                    res.status(200).send(movie);
                })
                .catch(err => {
                    res.status(500).json({ status: 500, message: err.message });
                })
        })
        .catch(err => {
            res.status(500).json({ status: 500, message: err.message });
        })



    // const movie = movies.find(c => c.id === parseInt(req.params.id));
    // if (!movie) { //404
    //     return res.status(404).send('The movie with the given id was not found')
    // }

    // const { error } = validateMovie(req.body);

    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }

    // movie.title = req.body.title;
    // res.send(movie);
});

router.delete('/movies/:id', (req, res, next) => {

    // Movie.findById(req.params.id, function (err, movie) {
    //     movie.remove(function (err, movie) {
    //         if (err) {
    //             return res.status(500).json({ status: 500, message: err.message });
    //         }
    //         res.status(200).json({ status: 200, message: "Movie deleted" })
    //     });
    // });

    const id = req.params.id;
    Movie.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ status: 200, deletedMovie: result, message: "Movie deleted" })
        })
        .catch(err => {
            res.status(500).json({ status: 500, message: err.message });
        })




    // const movie = movies.find(c => c.id === parseInt(req.params.id));
    // if (!movie) { //404
    //     return res.status(404).send('The movie with the given id was not found')
    // }

    // const index = movies.indexOf(movie); //take index in array to find
    // movies.splice(index, 1);    // delete movie from array

    // res.send(movie);
});



module.exports = router;