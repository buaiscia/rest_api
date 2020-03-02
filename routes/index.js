const Joi = require('@hapi/joi');
const express = require('express');
const mongoose = require('mongoose');
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

router.get('/movies/', paginatedResults(Movie), (req, res) => {
    res.json(res.paginatedResults);
});


router.get('/movies/:id', (req, res, next) => {
    const id = req.params.id;
    Movie.findById(id)
        .select('-__v')
        .then(result => {
            if (result) {
                res.status(200).json({
                    item: result,
                    request: {
                        type: 'GET',
                        url: req.get('host') + '/movies/' + result._id
                    }
                })
            }
            else {
                res.status(404).json({ status: 404, message: 'The provided ID does not match any movie' });
            }
        })
        .catch(err => {
            res.status(500).json({ status: 500, message: 'Invalid ID provided' });
        })
});


router.get('/movies/:id/images/:type', (req, res, next) => {
    const id = req.params.id;
    const type = req.params.type;
    Movie.findById(id)
        .then(result => {
            if (type === 'poster' || type === 'cover' || type === 'background') {
                imgType = result.images[type];
                res.status(200).json({ posterImage: imgType })
            }
            else {
                res.status(404).json({ status: 404, message: 'type of image not found' })
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
            res.status(200).json({
                item: result,
                request: {
                    type: 'GET',
                    url: req.get('host') + '/movies/' + result._id
                }
            })
        })
        .catch(err => {
            res.status(500).json({ status: 500, message: err.message });
        })
});


router.patch('/movies/:id', (req, res, next) => {
    const id = req.params.id;

    Movie.update({ _id: id }, req.body)
        .then(result => {
            res.status(200).json({
                message: 'Item updated',
                item: result,
                request: {
                    type: 'GET',
                    url: req.get('host') + '/movies/' + id
                }
            })
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
            res.status(200).json({
                message: 'Item deleted',
                item: result
            })
        })
        .catch(err => {
            res.status(500).json({ status: 500, message: err.message });
        })
});


function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {};

        if (endIndex < await model.countDocuments().exec()) {
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

        const totalCount = await model.countDocuments().exec();
        results.count = totalCount;

        try {
            results.results = await model.find().select('-__v').limit(limit).skip(startIndex).exec();
            if (Object.keys(results.results).length === 0) {
                res.status(404).json({ status: 404, message: 'Not found' });
            }

            // for (item in results.results) {
            //     results.results[item].getData = {}
            //     results.results[item].getData.type = 'GET'
            //     results.results[item].getData.url = req.get('host') + '/movies/' + results.results[item]._id
            // }
            // console.log(results);

            res.paginatedResults = results;
            next()
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}



module.exports = router;