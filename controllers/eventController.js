const { Op } = require('sequelize');
const sequelize = require('../config/database');
const Event = require('../models/event');
const { publishMessage } = require('../config/redis');

exports.createEvent = async (req, res) => {
    try {
        const { name, description, latitude, longitude, event_date, categories } = req.body;

        // Validate required fields
        if (!name || !latitude || !longitude || !event_date) {
            return res.status(400).json({ error: req.t('missing_fields') });
        }

        // Ensure categories is provided, otherwise return an error
        if (!categories) {
            return res.status(400).json({ error: req.t('categories_required') });
        }

        // Validate latitude and longitude
        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ error: 'Latitude and longitude must be valid numbers' });
        }

        // Create the event with location
        const event = await Event.create({
            name,
            description,
            latitude,
            longitude,
            event_date,
            categories,
            // Corrected the string interpolation issue
            location: sequelize.literal(`ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)`),
        });

        // Publish notification to Redis
        const notification = {
            eventId: event.id,
            name: event.name,
            categories: event.categories,
            event_date: event.event_date,
        };
        await publishMessage('event_notifications', notification);

        res.status(201).json({ message: req.t('event_created'), event });
    } catch (error) {
        console.error('Error creating event:', error);  // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
};
