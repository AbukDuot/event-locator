const request = require('supertest');
const { app, db } = require('../server'); 
const User = require('../models/user'); 

// Mock data for testing
const mockUser = {
  name: 'Test User',
  email: 'testuser@example.com',
  password: 'password123',
  location: {
    type: 'Point',
    coordinates: [40.7128, -74.0060],
  },
  preferences: ['music', 'sports'],
};

describe('User Controller Tests', () => {
  beforeAll(async () => {
    // Sync the database before running tests
    await db.sync({ force: true });
    // Create the mock user before tests
    await User.create(mockUser);
  });

  afterAll(async () => {
    // Close the database connection after tests
    await db.close();
  });

  it('should create a new user', async () => {
    const newUser = {
      name: 'New User',
      email: 'newuser@example.com',
      password: 'password123',
      location: {
        type: 'Point',
        coordinates: [34.0522, -118.2437],
      },
      preferences: ['movies', 'travel'],
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.email).toBe(newUser.email);
  });

  it('should get all users', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should get a single user by ID', async () => {
    const user = await User.findOne({ where: { email: mockUser.email } });
    const response = await request(app)
      .get(`/api/users/${user.id}`)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe(mockUser.email);
  });

  it('should update a user', async () => {
    const user = await User.findOne({ where: { email: mockUser.email } });
    const updatedData = { name: 'Updated User', preferences: ['movies', 'travel'] };

    const response = await request(app)
      .put(`/api/users/${user.id}`)
      .send(updatedData)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe(updatedData.name);
    expect(response.body.data.preferences).toEqual(updatedData.preferences);
  });

  it('should delete a user', async () => {
    const user = await User.findOne({ where: { email: mockUser.email } });

    const response = await request(app)
      .delete(`/api/users/${user.id}`)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User deleted successfully');
  });
});