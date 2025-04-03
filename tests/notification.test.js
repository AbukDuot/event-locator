// tests/notification.test.js

const { sendEmail } = require('../controllers/notificationController');

jest.mock('nodemailer'); // Mock the email sending module

describe('Notification System', () => {
    
    test('should send email notification', () => {
        // Arrange
        const to = 'test@example.com';
        const subject = 'Event Update';
        const message = 'Your event has been updated!';
        
        // Act
        const result = sendEmail(to, subject, message);
        
        // Assert
        expect(result).toEqual({ to, subject, message });
    });
});
