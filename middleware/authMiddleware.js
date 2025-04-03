const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid authorization header format' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET missing from environment');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ error: 'Token has expired' });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({ error: 'Invalid token' });
      } else {
        console.error('Error verifying token:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateUser; // Export as a single function
