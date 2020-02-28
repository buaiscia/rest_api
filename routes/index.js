const Joi = require('@hapi/joi');
const express = require('express');
const mongoose = require('mongoose')
const Movie = require('../models/movie');

const router = express.Router();

const app = express();

app.use(express.json());


function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(2).required()
    });
    return schema.validate(movie);
}


router.get('/', (req, res, next) => {
    res.send('Hello world');


});

router.get('/movies/', (req, res, next) => {

    Movie.find()
        .exec()
        .then(movies => {
            if (Object.keys(movies).length === 0) {
                res.status(404).json({ status: 404, message: 'No movie found' });
            }
            else {
                const page = parseInt(req.query.page);
                const limit = parseInt(req.query.limit);

                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;

                const results = {};

                if(endIndex < movies.length) {
                    results.next = {
                        page: page + 1,
                        limit: limit
                    }
                }
                

                if (startIndex > 0) {
                    results.previous = {
                        page: page - 1,
                        limit: limit
                    }
                }


                results.results = movies.slice(startIndex, endIndex)

                res.status(200).send(results);
            }
        })
        .catch(err => {
            res.status(500).json({ status: 500, message: err.message });
        })

});


router.get('/movies/:id', (req, res, next) => {
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
        childrenFriendly: req.body.childrenFriendly
    });

    movie.save()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).json({ status: 500, message: err.message });
        })
});


router.patch('/movies/:id', (req, res, next) => {
    const id = req.params.id;

    Movie.update({ _id: id }, req.body)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).json({ status: 500, message: err.message });
        })
})


router.delete('/movies/:id', (req, res, next) => {

    const id = req.params.id;
    Movie.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ status: 200, deletedMovie: result, message: "Movie deleted" })
        })
        .catch(err => {
            res.status(500).json({ status: 500, message: err.message });
        })
});



module.exports = router;