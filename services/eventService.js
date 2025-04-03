const { Event } = require('../models');

/**
 * Create a new event
 * @param {Object} eventData - Event data
 * @returns {Object} - Created event
 */
const createEvent = async (eventData) => {
  const event = await Event.create(eventData);
  return event;
};

/**
 * Get all events
 * @returns {Array} - List of events
 */
const getAllEvents = async () => {
  const events = await Event.findAll();
  return events;
};

/**
 * Get an event by ID
 * @param {String} eventId - Event ID
 * @returns {Object} - Event data
 */
const getEventById = async (eventId) => {
  const event = await Event.findByPk(eventId);
  if (!event) {
    throw new Error('Event not found');
  }
  return event;
};

/**
 * Update an event
 * @param {String} eventId - Event ID
 * @param {Object} updateData - Data to update
 * @returns {Object} - Updated event
 */
const updateEvent = async (eventId, updateData) => {
  const event = await getEventById(eventId);
  await event.update(updateData);
  return event;
};

/**
 * Delete an event
 * @param {String} eventId - Event ID
 */
const deleteEvent = async (eventId) => {
  const event = await getEventById(eventId);
  await event.destroy();
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};