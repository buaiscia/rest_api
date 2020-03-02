const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, 'Title is mandatory']
    },
    director: {
        type: String,
        required: [true, 'Director is mandatory']
    },
    description: {
        type: String,
        required: [true, 'Description is mandatory']
    },
    shortDescription: {
        type: String,
        required: false
    },
    duration: {
        type: Number,
        required: [true, 'Duration is mandatory'],
        min: [10, 'Time is too little']
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
            required:  [true, 'At least the poster image is mandatory'],
        },
        background: {
            type: String,
            required: false
        }
    },
    genre: {
        name: {
            type: String,
            required: [true, 'Genre is mandatory, choose among: Documentary, Scifi, Thriller, Biography, Romance, Children, Other'],
            enum: ['Documentary', 'Scifi', 'Thriller', 'Biography', 'Romance', 'Children', 'Other'],
        },
    },
    childrenFriendly : {
        type: Boolean,
        required: false
    },
})

var Movie = mongoose.model('Movie', movieSchema);
 
module.exports = Movie;
