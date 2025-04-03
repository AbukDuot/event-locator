const express = require('express');
const authenticateUser = require('../middleware/authMiddleware');
const { 
  createNotification, 
  getNotifications, 
  getNotificationById, 
  markNotificationAsRead, 
  deleteNotification 
} = require('../controllers/notificationController');

const router = express.Router();

router.use(authenticateUser);

router.post('/', createNotification);
router.get('/', getNotifications);
router.get('/:id', getNotificationById);
router.put('/:id/read', markNotificationAsRead);
router.delete('/:id', deleteNotification);

module.exports = router;
