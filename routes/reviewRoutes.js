const express = require('express');
const { addReview, getReviewsByEvent } = require('../controllers/reviewController');

const router = express.Router();

// Add a review for an event
router.post('/', addReview);

// Get all reviews for a specific event
router.get('/:eventId', getReviewsByEvent);

module.exports = router;