const { Favorite } = require('../models');

/**
 * Add an event to favorites
 * @param {String} userId - User ID
 * @param {String} eventId - Event ID
 * @returns {Object} - Created favorite
 */
const addFavorite = async (userId, eventId) => {
  const favorite = await Favorite.create({ userId, eventId });
  return favorite;
};

/**
 * Get all favorite events for a user
 * @param {String} userId - User ID
 * @returns {Array} - List of favorite events
 */
const getFavoritesByUser = async (userId) => {
  const favorites = await Favorite.findAll({ where: { userId } });
  return favorites;
};

module.exports = {
  addFavorite,
  getFavoritesByUser,
};