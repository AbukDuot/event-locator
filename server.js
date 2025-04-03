const express = require('express');
const session = require('express-session');
const passport = require('passport');
const http = require('http');
const db = require('./config/database');
const { errorHandler } = require('./middleware/errorMiddleware');
const { requestLogger } = require('./middleware/loggingMiddleware');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(requestLogger);

// Import routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Apply routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/notifications', notificationRoutes);

// Global error handling middleware
app.use(errorHandler);

// Create HTTP server
const server = http.createServer(app);

// Database connection and model sync
db.authenticate()
  .then(() => {
    console.log('Database connected...');
    return db.sync({ force: process.env.NODE_ENV === 'development' });
  })
  .then(() => console.log('Models synchronized...'))
  .catch((err) => {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server, db };
