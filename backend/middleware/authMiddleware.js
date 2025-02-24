const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Check if the token is passed in the "Authorization" header
  const token = req.header('Authorization')?.split(' ')[1];

  // If no token is provided, return an access denied error
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the JWT_SECRET from the environment
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to the request object (req.user)
    req.user = decoded; // This will contain user info like user._id, user.email, etc.

    // If role-based authorization is required (e.g., checking if user is an admin):
    if (req.user.role && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. You do not have admin privileges.' });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle different token verification errors
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: 'Invalid token.' });
    }
    // Handle other errors
    return res.status(500).json({ message: 'An error occurred during token verification.' });
  }
};

module.exports = authMiddleware;
