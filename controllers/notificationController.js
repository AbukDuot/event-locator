const { Notification } = require('../models');

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const parsedUserId = parseInt(userId, 10); // Convert to integer

    if (isNaN(parsedUserId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    const notification = await Notification.create({ userId: parsedUserId, message });

    return res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      notification,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all notifications for the authenticated user
exports.getNotifications = async (req, res) => {
  try {
    const userId = parseInt(req.user.id, 10); // Ensure userId is an integer

    if (isNaN(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    const notifications = await Notification.findAll({ where: { userId } });

    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get a single notification by ID
exports.getNotificationById = async (req, res) => {
  try {
    const notificationId = parseInt(req.params.id, 10); // Convert to integer

    if (isNaN(notificationId)) {
      return res.status(400).json({ success: false, message: 'Invalid notification ID' });
    }

    const notification = await Notification.findByPk(notificationId);

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    return res.status(200).json({
      success: true,
      notification,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Mark a notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = parseInt(req.params.id, 10); // Convert to integer

    if (isNaN(notificationId)) {
      return res.status(400).json({ success: false, message: 'Invalid notification ID' });
    }

    const notification = await Notification.findByPk(notificationId);

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    notification.isRead = true;
    await notification.save();

    return res.status(200).json({
      success: true,
      message: 'Notification marked as read successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    const notificationId = parseInt(req.params.id, 10); // Convert to integer

    if (isNaN(notificationId)) {
      return res.status(400).json({ success: false, message: 'Invalid notification ID' });
    }

    const notification = await Notification.findByPk(notificationId);

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    await notification.destroy();

    return res.status(200).json({
      success: true,
      message: 'Notification deleted successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
