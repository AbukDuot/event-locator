const { Review } = require('../models');

/**
 * Add a review for an event
 * @param {Object} reviewData - Review data
 * @returns {Object} - Created review
 */
const addReview = async (reviewData) => {
  const review = await Review.create(reviewData);
  return review;
};

/**
 * Get all reviews for an event
 * @param {String} eventId - Event ID
 * @returns {Array} - List of reviews
 */
const getReviewsByEvent = async (eventId) => {
  const reviews = await Review.findAll({ where: { eventId } });
  return reviews;
};

module.exports = {
  addReview,
  getReviewsByEvent,
};