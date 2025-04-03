/**
 * Calculate the distance between two geographical points using the Haversine formula
 * @param {Array} point1 - [latitude, longitude] of the first point
 * @param {Array} point2 - [latitude, longitude] of the second point
 * @returns {Number} - Distance in kilometers
 */
const haversineDistance = (point1, point2) => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
  
    const [lat1, lon1] = point1;
    const [lat2, lon2] = point2;
  
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };
  
  module.exports = {
    haversineDistance,
  };