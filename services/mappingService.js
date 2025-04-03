const axios = require('axios');

/**
 * Get coordinates (latitude and longitude) for a given address
 * @param {String} address - The address to geocode
 * @returns {Object} - Coordinates { lat, lng }
 */
const getCoordinates = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  const response = await axios.get(url);
  if (response.data.status !== 'OK') {
    throw new Error('Failed to fetch coordinates');
  }

  const { lat, lng } = response.data.results[0].geometry.location;
  return { lat, lng };
};

module.exports = {
  getCoordinates,
};