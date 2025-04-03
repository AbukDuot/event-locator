const moment = require('moment');

/**
 * Format a date to a readable string
 * @param {Date} date - Date object
 * @param {String} format - Desired format (default: 'YYYY-MM-DD HH:mm:ss')
 * @returns {String} - Formatted date string
 */
const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(date).format(format);
};

/**
 * Check if a date is in the past
 * @param {Date} date - Date object
 * @returns {Boolean} - True if the date is in the past, false otherwise
 */
const isPastDate = (date) => {
  return moment(date).isBefore(moment());
};

module.exports = {
  formatDate,
  isPastDate,
};