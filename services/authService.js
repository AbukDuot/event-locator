const bcrypt = require('bcrypt');
const { generateToken } = require('. ./utils/tokenUtil');
const { User } = require('../models'); // Assuming you have a User model

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Object} - Created user
 */
const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Check if the email already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = await User.create({ name, email, password: hashedPassword });
  return user;
};

/**
 * Log in a user
 * @param {String} email - User email
 * @param {String} password - User password
 * @returns {Object} - Token and user data
 */
const loginUser = async (email, password) => {
  // Find the user by email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Verify the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate a JWT token
  const token = generateToken({ userId: user.id });
  return { token, user };
};

module.exports = {
  registerUser,
  loginUser,
};