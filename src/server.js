const jwt = require('jsonwebtoken');
const Application = require("./model/application");
const Account = require("./model/account");
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
require('dotenv').config();
const port = 3001; // process.env.SERVER_PORT; //Add this

/**
 * Enable CORS and set up middleware for parsing JSON and cookies.
 */
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/'); // Change '*' to your frontend URL in production
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)
  next();
});

/**
 * Middleware for authenticating JWT tokens.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
function authenticateJWT(req, res, next) {
  const jwtToken = req.cookies.jwt;
  if (!jwtToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const jwtPayload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = jwtPayload; // Attach user information to the request object
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ error: 'Invalid token' });
  }
}

/**
 * Route for retrieving all applications.
 */
app.get('/allApplications', authenticateJWT, async (req, res) => {
  try {
    const data = await Application.listAllApplications();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Route for logging in.
 */
app.post('/login', async (req, res) => {
  try {
    const data = await Account.login(req);
    res.cookie('jwt', data.token, { httpOnly: true, domain: 'localhost' }); // Tell the client to send a cookie with JWT token afterwards
    res.json(data.user);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

/**
 * Route for creating a new account.
 */
app.post('/createAccount', async (req, res) => {
  try {
    const data = await Account.createAccount(req);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Start the server and listen for incoming connections.
 */
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
