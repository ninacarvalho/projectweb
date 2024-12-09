const express = require('express');
const db = require('../db');
const router = express.Router();

// Render the form for user input
router.get('/', (req, res) => {
    res.render('form', { movies: null, error: null });
});

router.get('/ui', (req, res) => {
    res.render('form', { movies: null, error: null });
});


// Handle form submission
router.post('/', async (req, res) => {
    const { page = 1, perPage = 10, genre } = req.body;

    try {
        const movies = await db.getAllMovies(page, perPage, genre);
        res.render('form', { movies, error: null });
    } catch (err) {
        res.render('form', { movies: null, error: err.message });
    }
});

module.exports = router;
