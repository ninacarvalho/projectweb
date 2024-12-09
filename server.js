const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Static Files for CSS
app.use(express.static('public'));

// Database Initialization
db.initialize(process.env.MONGO_URI)
    .then(() => {
        console.log("Database initialized successfully.");

        // API Routes
        app.use('/api/movies', require('./routes/movies'));

        // Form and UI Routes
        app.use('/', require('./routes/ui'));

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("Failed to initialize database:", err.message);
        process.exit(1);
    });
