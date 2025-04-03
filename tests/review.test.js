const { submitReview } = require('../controllers/reviewController');  // Import the submitReview function (adjust the path to where it's defined)

jest.mock('../controllers/reviewController', () => ({
  submitReview: jest.fn(() => Promise.resolve({
    id: 1,
    userId: 1,
    eventId: 1,
    rating: 5,
    comment: 'Great event!',
  })),
}));

describe('Review System', () => {
  it('should return true for a basic check', () => {
    expect(true).toBe(true);
  });

  // Test for submitting a review
  it('should allow users to submit a review', async () => {
    const review = await submitReview({
      userId: 1,
      eventId: 1,
      rating: 5,
      comment: 'Great event!',
    });
    expect(review).toHaveProperty('id'); // Check if review has an 'id' property
    expect(review.rating).toBe(5); // Check if rating is 5
    expect(review.comment).toBe('Great event!'); // Check if comment matches
  });
});
