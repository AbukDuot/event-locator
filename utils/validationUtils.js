const Joi = require('joi');

/**
 * Validate user registration data
 * @param {Object} data - User registration data
 * @returns {Object} - Validation result
 */
const validateRegistration = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

/**
 * Validate event creation data
 * @param {Object} data - Event creation data
 * @returns {Object} - Validation result
 */
const validateEvent = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().optional(),
    location: Joi.array().items(Joi.number()).length(2).required(), // [latitude, longitude]
    date: Joi.date().required(),
    categories: Joi.array().items(Joi.string()).required(),
  });

  return schema.validate(data);
};

module.exports = {
  validateRegistration,
  validateEvent,
};