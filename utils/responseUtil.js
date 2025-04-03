/**
 * Send a success response
 * @param {Object} res - Express response object
 * @param {Object} data - Response data
 * @param {String} message - Success message
 * @param {Number} statusCode - HTTP status code (default: 200)
 */
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };
  
  /**
   * Send an error response
   * @param {Object} res - Express response object
   * @param {Error} error - Error object
   * @param {Number} statusCode - HTTP status code (default: 500)
   */
  const errorResponse = (res, error, statusCode = 500) => {
    return res.status(statusCode).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  };
  
  module.exports = {
    successResponse,
    errorResponse,
  };