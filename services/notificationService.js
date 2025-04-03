const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();

/**
 * Publish a notification
 * @param {String} channel - Notification channel
 * @param {Object} message - Notification message
 */
const publishNotification = async (channel, message) => {
  await redisClient.publish(channel, JSON.stringify(message));
};

module.exports = {
  publishNotification,
};