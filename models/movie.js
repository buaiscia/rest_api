const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    description: String,
    shortDescription: String,
    duration: Number,
    releaseDate: Date,
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