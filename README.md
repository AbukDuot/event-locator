# Event Locator Application

The **Event Locator Application** is a multi-user backend application built with Node.js. It allows users to discover events based on their location and preferences. The application supports multilingual functionality, geospatial data handling, and asynchronous notifications, making it a robust and scalable solution for event management.

![Uploading Screenshot 2025-04-03 233219.png…]()

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)

---

## Features

### Core Features
- **User Management**: Secure user registration and login with password hashing.
- **Event Management**: Create, read, update, and delete events with geospatial data (latitude/longitude).
- **Location-Based Search**: Search for events within a specified radius of the user's location.
- **Category Filtering**: Filter events based on categories.
- **Multilingual Support (i18n)**: Support for multiple languages in the user interface.
- **Notification System**: Asynchronous notifications for upcoming events using a message queue.

### Additional Features
- **Event Ratings and Reviews**: Users can rate and review events.
- **Favorites**: Users can save events to their favorites list.
- **Real-Time Updates**: Real-time updates for event changes using WebSockets.
- **Mapping Integration**: Display event locations on a map using Google Maps API.

---

## Technologies Used

- **Backend Framework**: Node.js with Express.js
- **Database**: PostgreSQL with PostGIS for geospatial data handling
- **Authentication**: bcrypt for password hashing, Passport.js for authentication
- **Message Queue**: Redis Pub/Sub or RabbitMQ for asynchronous notifications
- **Internationalization**: i18next for multilingual support
- **Testing**: Jest for unit testing
- **Real-Time Updates**: Socket.IO for WebSocket communication
- **Geospatial Libraries**: PostGIS functions for geospatial queries

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL with PostGIS extension
- Redis or RabbitMQ (for notifications)
- Git

### Installation
1. Clone the repository:
 ```bash
   git clone https://github.com/your-username/event-locator.git
   cd event-locator
   ```

2. Install dependencies:
 ```bash
   npm install
   ```

3. Set up the environment variables:
   Create a .env file in the root directory and configure the following:
 ```env
   PORT=5000
   DATABASE_URL=postgres://username:password@localhost:5432/event_locator
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your_jwt_secret
   ```

4. Set up the database:
   - Create a PostgreSQL database and enable the PostGIS extension.
   - Run the migrations to set up the schema:
   ```bash
  npm run migrate
     ```

5. Start the application:
```bash
   npm start
   ```

6. Run tests:
 ```bash
   npm test
   ```

---

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user

### Events
- `POST /api/events`: Create a new event
- `GET /api/events`: Get all events
- `GET /api/events/:id`: Get event details by ID
- `PUT /api/events/:id`: Update an event
- `DELETE /api/events/:id`: Delete an event

### Search
- `GET /api/search`: Search for events by location and radius

### Reviews
- `POST /api/reviews`: Add a review for an event
- `GET /api/reviews/:eventId`: Get reviews for an event

### Favorites
- `POST /api/favorites`: Add an event to favorites
- `GET /api/favorites`: Get all favorite events

---

## Database Schema

### Tables
1. **Users**: Stores user information, including location and preferences.
2. **Events**: Stores event details, including geospatial data (latitude/longitude).
3. **Reviews**: Stores user reviews and ratings for events.
4. **Favorites**: Stores user favorite events.
5. **Notifications**: Stores notification data for asynchronous processing.

---

## Testing

- The project uses **Jest** for unit testing.
- To run tests:
  ```bash
  npm test
  ```
- Test coverage includes:
  - User authentication
  - Event CRUD operations
  - Location-based search
  - Notification system

---

## Project Structure

```
event-locator/
├── controllers/        # Route controllers
├── models/             # Database models
├── routes/             # API routes
├── services/           # Business logic and services
├── config/             # Configuration files (e.g., database, i18n)
├── tests/              # Unit tests
├── migrations/         # Database migrations
├── locales/            # Translation files for i18n
├── .env                # Environment variables
├── README.md           # Project documentation
└── server.js           # Application entry point
```

---

## Future Enhancements

- Add social login (e.g., Google, Facebook).
- Implement advanced search filters (e.g., date range, price range).
- Add email notifications for event updates.
- Build a frontend for the application using React or Angular.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
```

### Notes:
- Replace placeholders like `your-username` and `LICENSE` with actual values.
- Add more details to the API Endpoints section if needed.
- Ensure the setup instructions match your actual project configuration.
### Notes:
- Replace placeholders like `your-username` and `LICENSE` with actual values.
- Add more details to the API Endpoints section if needed.
- Ensure the setup instructions match your actual project configuration.
