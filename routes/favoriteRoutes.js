const express = require('express');
const { addFavorite, getFavorites, removeFavorite } = require('../controllers/favoriteController');

const router = express.Router();

// Add an event to favorites
router.post('/', addFavorite);

// Get all favorite events for a user
router.get('/', getFavorites);

// Remove an event from favorites
router.delete('/:eventId', removeFavorite);

module.exports = router;