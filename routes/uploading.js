const csv = require('fast-csv');
const mongoose = require('mongoose');

const Movie = require('../models/movie');

exports.post = function (req, res) {
    if(!req.files) 
        return res.status(400).send('No files were uploaded');
    let movieFile = req.files.file;
    let movies = [];

    csv
      .fromString(movieFile.data.toString(), {
          headers: true,
          ignoreEmpty: true
      })
      .on('data', function(data) {
          data['_id'] = new mongoose.Types.ObjectId();
          movies.push(data)
      })
      .on('end', function() {
          Movie.create(movies, function(err, doc) {
              if(err) throw err;
          });
          res.send(movies.length + ' movies have been uploaded')
      })
}
