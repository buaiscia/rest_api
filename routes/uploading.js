


exports.post = function (req, res) {

    const formidable = require('formidable');
    const path = require('path');
    const fs = require("fs");
    const assert = require('assert');

    const Movie = require('../models/movie');




    const form = new formidable.IncomingForm({ multiples: true });
    form.uploadDir = '../collection/';

    form.parse(req, (err) => {
        if (err) {
            next(err);
            return;
        }
    });

    form.on('fileBegin', function (name, file) {
        file.path = 'collection/' + file.name;
        let pathFile = file.path;
        let fileToRead = fs.readFileSync(pathFile, 'utf-8');
        let parsed = JSON.parse(fileToRead);
        console.log(parsed);
        Movie.collection.insertMany(parsed, function (err, r) {
            assert.equal(null, err);
        });

    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
    });

    res.sendFile('upload.html', {
        root: path.join(__dirname, '../views/')
    });


}
