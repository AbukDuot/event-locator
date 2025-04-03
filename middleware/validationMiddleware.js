const express = require('express');
const Joi = require('joi');
const { validate } = require('./middleware/validationMiddleware');
const { createEvent } = require('./controllers/eventController');

const router = express.Router();

// Joi schema for event creation
const eventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  location: Joi.array().items(Joi.number()).length(2).required(),
  date: Joi.date().required(),
  categories: Joi.array().items(Joi.string()).required(),
});

router.post('/events', validate(eventSchema), createEvent); // Validate request body before creating an event

module.exports = router;