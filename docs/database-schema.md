# Database Schema

This document outlines the database schema for the Event Locator application.

---

## Tables

### 1. **Users**
Stores user information, including authentication details and preferences.

| Column        | Data Type        | Constraints                  | Description                          |
|---------------|------------------|------------------------------|--------------------------------------|
| `id`          | UUID             | Primary Key, Auto-generated  | Unique identifier for the user.      |
| `name`        | STRING           | NOT NULL                     | Full name of the user.               |
| `email`       | STRING           | NOT NULL, UNIQUE             | Email address of the user.           |
| `password`    | STRING           | NOT NULL                     | Hashed password for authentication.  |
| `location`    | GEOMETRY(Point)  | NULLABLE                     | User's geographical location.        |
| `preferences` | ARRAY(STRING)    | NULLABLE                     | User's preferred event categories.   |
| `createdAt`   | TIMESTAMP        | Auto-generated               | Timestamp when the user was created. |
| `updatedAt`   | TIMESTAMP        | Auto-generated               | Timestamp when the user was updated. |

---

### 2. **Events**
Stores event details, including location and categories.

| Column        | Data Type        | Constraints                  | Description                          |
|---------------|------------------|------------------------------|--------------------------------------|
| `id`          | UUID             | Primary Key, Auto-generated  | Unique identifier for the event.     |
| `title`       | STRING           | NOT NULL                     | Title of the event.                  |
| `description` | TEXT             | NULLABLE                     | Description of the event.            |
| `location`    | GEOMETRY(Point)  | NOT NULL                     | Geographical location of the event.  |
| `date`        | TIMESTAMP        | NOT NULL                     | Date and time of the event.          |
| `categories`  | ARRAY(STRING)    | NOT NULL                     | Categories associated with the event.|
| `createdBy`   | UUID             | Foreign Key (Users.id)       | User who created the event.          |
| `createdAt`   | TIMESTAMP        | Auto-generated               | Timestamp when the event was created.|
| `updatedAt`   | TIMESTAMP        | Auto-generated               | Timestamp when the event was updated.|

---

### 3. **Favorites**
Stores user favorite events.

| Column        | Data Type        | Constraints                  | Description                          |
|---------------|------------------|------------------------------|--------------------------------------|
| `id`          | UUID             | Primary Key, Auto-generated  | Unique identifier for the favorite.  |
| `userId`      | UUID             | Foreign Key (Users.id)       | User who favorited the event.        |
| `eventId`     | UUID             | Foreign Key (Events.id)      | Event that was favorited.            |
| `createdAt`   | TIMESTAMP        | Auto-generated               | Timestamp when the favorite was created. |

---

### 4. **Reviews**
Stores user reviews and ratings for events.

| Column        | Data Type        | Constraints                  | Description                          |
|---------------|------------------|------------------------------|--------------------------------------|
| `id`          | UUID             | Primary Key, Auto-generated  | Unique identifier for the review.    |
| `userId`      | UUID             | Foreign Key (Users.id)       | User who wrote the review.           |
| `eventId`     | UUID             | Foreign Key (Events.id)      | Event being reviewed.                |
| `rating`      | INTEGER          | NOT NULL, 1-5                | Rating given to the event.           |
| `comment`     | TEXT             | NULLABLE                     | Review comment.                      |
| `createdAt`   | TIMESTAMP        | Auto-generated               | Timestamp when the review was created. |

---

### 5. **Notifications**
Stores notifications sent to users.

| Column        | Data Type        | Constraints                  | Description                          |
|---------------|------------------|------------------------------|--------------------------------------|
| `id`          | UUID             | Primary Key, Auto-generated  | Unique identifier for the notification. |
| `userId`      | UUID             | Foreign Key (Users.id)       | User who received the notification.  |
| `eventId`     | UUID             | Foreign Key (Events.id)      | Event associated with the notification. |
| `message`     | STRING           | NOT NULL                     | Notification message.                |
| `isRead`      | BOOLEAN          | Default: false               | Whether the notification was read.   |
| `createdAt`   | TIMESTAMP        | Auto-generated               | Timestamp when the notification was created. |

---

### Relationships
1. **Users ↔ Events**:
   - A user can create multiple events (`Users.id` → `Events.createdBy`).

2. **Users ↔ Favorites**:
   - A user can favorite multiple events (`Users.id` → `Favorites.userId`).

3. **Users ↔ Reviews**:
   - A user can write multiple reviews (`Users.id` → `Reviews.userId`).

4. **Events ↔ Reviews**:
   - An event can have multiple reviews (`Events.id` → `Reviews.eventId`).

5. **Users ↔ Notifications**:
   - A user can receive multiple notifications (`Users.id` → `Notifications.userId`).
