import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware to protect routes - Verify JWT token
 * Adds user object to request if valid token is provided
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check if authorization header exists and starts with 'Bearer'
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Please login.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      // Check if user still exists
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists'
        });
      }

      // Check if user is active
      if (!req.user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User account is deactivated'
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please login again.'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication',
      error: error.message
    });
  }
};

/**
 * Middleware to restrict access based on user roles
 * @param {...String} roles - Allowed roles (e.g., 'admin', 'user')
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user role is included in allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};