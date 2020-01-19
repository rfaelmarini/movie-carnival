const express = require('express');

const movieController = require('../controllers/movie');

const router = express.Router();

router.get("/upcoming", movieController.getUpcomingMovies)
router.get("/search", movieController.getMoviesByName)

module.exports = router;