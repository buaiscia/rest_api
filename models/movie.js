const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: false
    },
    duration: {
        type: Number,
        required: false
    },
    releaseDate: {
        type: String,
        required: false
    },
    images: {
        cover: {
            type: String,
            required: false
        },
        poster: {
            type: String,
            required: false
        },
        background: {
            type: String,
            required: false
        }
    },
    genre: {
        id: {
            type: Number,
            required: false
        },
        name: {
            type: String,
            required: false
        }
    },
    childrenFriendly : {
        type: Boolean,
        required: false
    },
})

var Movie = mongoose.model('Movie', movieSchema);
 
module.exports = Movie;
