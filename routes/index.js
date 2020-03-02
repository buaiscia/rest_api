// const Joi = require('@hapi/joi');
const express = require('express');
const mongoose = require('mongoose');
const Movie = require('../models/movie');
const MovieController = require('../controllers/movies');
const pagination = require('../middleware/pagination');

const router = express.Router();

const app = express();

app.use(express.json());


// function validateMovie(movie) {
//     const schema = Joi.object({
//         title: Joi.string().min(2).required()
//     });
//     return schema.validate(movie);
// }

router.get('/', (req, res, next) => {
    res.send('Hello world');
});

router.get('/movies/', pagination.paginatedResults(Movie), MovieController.get_all);


router.get('/movies/:id', MovieController.get_one);


router.get('/movies/:id/images/:type', MovieController.get_images);


router.post('/movies', MovieController.post_one);


router.patch('/movies/:id', MovieController.update_one);


router.delete('/movies/:id',MovieController.delete_one);



module.exports = router;