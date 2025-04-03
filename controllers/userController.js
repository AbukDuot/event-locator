const { User } = require('../models'); // Ensure User is imported only once

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Fetch all users
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // Fetch user by ID
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user' });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // Find user by ID
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update the user
    await user.update(req.body);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Failed to update user' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // Find user by ID
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Delete the user
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};