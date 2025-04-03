const Review = require('../models/review'); // Import the Review model

// Add a review for an event
const addReview = async (req, res) => {
  const { eventId, userId, rating, comment } = req.body;
  try {
    const review = await Review.create({ eventId, userId, rating, comment });
    res.status(201).json({ success: true, message: 'Review added successfully', data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding review', error: err.message });
  }
};

// Get all reviews for a specific event
const getReviewsByEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const reviews = await Review.findAll({ where: { eventId } });
    res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching reviews', error: err.message });
  }
};

module.exports = {
  addReview,
  getReviewsByEvent,
};