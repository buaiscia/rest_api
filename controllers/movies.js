const mongoose = require('mongoose');
const Movie = require('../models/movie');

exports.get_all = (req, res, next) => {
    res.json(res.paginatedResults);
}

exports.get_one = (req, res, next) => {
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
}

exports.get_images = (req, res, next) => {
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
}

exports.post_one = (req, res, next)  => {

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
}

exports.update_one = (req, res, next) => {
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
}

exports.delete_one = (req, res, next) => {
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
}