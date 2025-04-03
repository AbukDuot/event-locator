const Favorite = require('../models/favorite'); // Import the Favorite model

// Add an event to favorites
const addFavorite = async (req, res) => {
  const { userId, eventId } = req.body;
  try {
    const favorite = await Favorite.create({ userId, eventId });
    res.status(201).json({ success: true, message: 'Event added to favorites', data: favorite });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding favorite', error: err.message });
  }
};

// Get all favorite events for a user
const getFavorites = async (req, res) => {
  const { userId } = req.query; // Assuming userId is passed as a query parameter
  try {
    const favorites = await Favorite.findAll({ where: { userId } });
    res.status(200).json({ success: true, data: favorites });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching favorites', error: err.message });
  }
};

// Remove an event from favorites
const removeFavorite = async (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;
  try {
    const favorite = await Favorite.findOne({ where: { userId, eventId } });
    if (!favorite) {
      return res.status(404).json({ success: false, message: 'Favorite not found' });
    }
    await favorite.destroy();
    res.status(200).json({ success: true, message: 'Event removed from favorites' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error removing favorite', error: err.message });
  }
};

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite,
};