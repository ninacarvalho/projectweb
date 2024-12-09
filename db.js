const mongoose = require('mongoose');

// Define the Movie Schema
const movieSchema = new mongoose.Schema({
    title: String,
    plot: String,
    genres: [String],
    runtime: Number,
    cast: [String],
    poster: String,
    year: Number,
    imdb: {
        rating: Number,
        votes: Number,
        id: Number,
    },
    lastupdated: String,
    countries: [String],
    type: String,
});

// Create the Movie Model
let Movie;

// Module to export database functions
const db = {
    initialize: async (connectionString) => {
        try {
            // Connect to MongoDB
            await mongoose.connect(connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Connected to MongoDB Atlas.");

            // Initialize the model
            Movie = mongoose.model("Movie", movieSchema);
        } catch (err) {
            console.error("Error connecting to the database:", err.message);
            throw err;
        }
    },

    addNewMovie: async (data) => {
        try {
            const newMovie = new Movie(data);
            return await newMovie.save();
        } catch (err) {
            console.error("Error adding new movie:", err.message);
            throw err;
        }
    },

    getAllMovies: async (page, perPage, genre) => {
        try {
            const filter = genre ? { genres: genre } : {};
            const movies = await Movie.find(filter)
                .sort({ "imdb.rating": -1 }) // Sort by IMDb rating descending
                .skip((page - 1) * perPage)
                .limit(perPage);
            return movies;
        } catch (err) {
            console.error("Error fetching movies:", err.message);
            throw err;
        }
    },
    

    getMovieById: async (id) => {
        try {
            return await Movie.findById(id);
        } catch (err) {
            console.error("Error fetching movie by ID:", err.message);
            throw err;
        }
    },

    updateMovieById: async (data, id) => {
        try {
            return await Movie.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.error("Error updating movie:", err.message);
            throw err;
        }
    },

    deleteMovieById: async (id) => {
        try {
            return await Movie.findByIdAndDelete(id);
        } catch (err) {
            console.error("Error deleting movie:", err.message);
            throw err;
        }
    },
};


module.exports = db;
