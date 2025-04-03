const request = require('supertest');
const { app } = require('../server');

describe('Favorites Module', () => {
  let eventId = 'some-event-id'; // Replace with a valid event ID

  test('should add an event to favorites', async () => {
    const response = await request(app).post('/api/favorites').send({
      eventId,
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  test('should fetch all favorite events', async () => {
    const response = await request(app).get('/api/favorites');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
  });
});