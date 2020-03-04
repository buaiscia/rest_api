


exports.post = function (req, res) {

    const formidable = require('formidable');
    const fs = require('fs');
    const mongoose = require('mongoose');
    const Movie = require('../models/movie');




    const form = new formidable.IncomingForm({ multiples: true });
    form.uploadDir = 'collection/';

    form.parse(req, (err) => {
        if (err) {
            next(err);
            return;
        }
    });

    form.on('fileBegin', function (name, file) {
        file.path = 'collection/' + file.name;
    });

    form.on('file', function (name, file) {
        console.log('Downloaded ' + file.name);
        file.path = 'collection/' + file.name;
        let pathFile = file.path;
        let fileToRead = fs.readFileSync(pathFile, 'utf-8');
        let parsed = JSON.parse(fileToRead);

        Movie.insertMany(parsed, function (err) {
            if (err) {
                res.status(400).json({
                    message: 'Bad request',
                    error: err.message
                });
            }
            else {
                res.status(200).json({
                    message: 'Collection uploaded'
                });
            }

        });
    });
}
