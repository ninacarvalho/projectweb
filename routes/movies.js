const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const movie = await db.addNewMovie(req.body);
        res.status(201).json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    const { page = 1, perPage = 10, genre } = req.query;
    try {
        const movies = await db.getAllMovies(page, perPage, genre);
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await db.getMovieById(req.params.id);
        if (!movie) return res.status(404).json({ msg: 'Movie not found' });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedMovie = await db.updateMovieById(req.body, req.params.id);
        if (!updatedMovie) return res.status(404).json({ msg: 'Movie not found' });
        res.json(updatedMovie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedMovie = await db.deleteMovieById(req.params.id);
        if (!deletedMovie) return res.status(404).json({ msg: 'Movie not found' });
        res.json({ msg: 'Movie deleted successfully', movie: deletedMovie });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
