const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    director: String,
    description: String,
    shortDescription: String,
    duration: Number,
    releaseDate: String,
    images: {
        cover: String,
        poster: String,
        background: String
    },
    genre: {
        id: Number,
        name: String
    },
    childrenFriendly : Boolean
})

var Movie = mongoose.model('Movie', movieSchema);
 
module.exports = Movie;
