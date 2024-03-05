
const jwt = require('jsonwebtoken');

/**
 * Middleware for authenticating JWT tokens.
 * @function authenticateJWT
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns - Error status if user is not unauthorized or invalid jwtToken.
 */
function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      console.log("no authorization header found");
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const jwtToken = authHeader && authHeader.split(' ')[1];
    console.log("token:" +jwtToken)
    if (!jwtToken) {
      console.log("no token found")
      return res.status(401).json({ error: 'Unauthorized' });
    }else {
      try {
        const jwtPayload = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = jwtPayload; // Attach user information to the request object
        next();
      } catch (error) {
        console.error(error);
        return res.status(403).json({ error: 'Invalid token' });
      }
    }
  }
  module.exports = authenticateJWT;