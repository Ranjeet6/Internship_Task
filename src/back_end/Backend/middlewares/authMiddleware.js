const jwt = require('jsonwebtoken');
const User = require('../models/User');

function authenticate(req, res, next) {
  // Check for the presence of a valid token in the request header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the token and set user information in req.user
    const decoded = jwt.verify(token, 'ae516fd4b39e93c15f94fea31e5ebeba697edd1bd13758a07edcd48e7e8f3f67'); // Use the same secret key used for token generation

    // Fetch user details from the database based on the decoded user ID
    User.findById(decoded.userId, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
      }

      // Attach user information to the request object for future use
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
}

module.exports = { authenticate };