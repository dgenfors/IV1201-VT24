const express = require('express');
const authenticateJWT = require('./authJWT')
const router = express.Router();
/**
 * Everything below this will go through authentication
 */
router.use(authenticateJWT)

router.post('/checkIfLogIn', async (req,res) => {
    try {
      role = req.user.role; // Attach user information to the request object
      res.json(role)
    } catch (error) {
      console.error(error);
      return res.status(403).json({ error: 'Invalid token' });
    }
  }
)

module.exports = router;