const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const port = 3001;
const logsHandler = require('./integration/logsHandler');
const unauthorizedRoute = require('./apiReq/Unauthorized');
const recruiterRoute = require('./apiReq/RecruiterApi');
const userRoute = require('./apiReq/UserApi');
const userValidate = require('./apiReq/Validate');

/**
 * Middleware to enable CORS and set up parsing of JSON and cookies.
 * @middleware
 */
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://iv1201-vt24-frontend.vercel.app'); // Change '*' to your frontend URL in production
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, application/json, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)
  res.setHeader('Access-Control-Expose-Headers', 'Authorization');
  next();
});

/**
 * OPTIONS method handler to handle preflight requests.
 * @route OPTIONS *
 */
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://iv1201-vt24-frontend.vercel.app'); // Change '*' to your frontend URL in production
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)
  res.setHeader('Access-Control-Expose-Headers', 'Authorization');
  res.sendStatus(200);
});

/**
 * Middleware to handle logging of HTTP requests.
 * @middleware
 */
app.use(logsHandler.appendReqLineToFile);

/**
 * Route to serve the root endpoint.
 * @route GET /
 * @returns {String} Message indicating that Express is running on Vercel.
 */
app.get("/", (req, res) => res.send("Express on Vercel"));

/**
 * Route handlers for various API endpoints.
 */
app.use('/unauthorized', unauthorizedRoute);
app.use('/recruiter', recruiterRoute);
app.use('/user', userRoute);
app.use('/validate', userValidate);

/**
 * Start the server and listen for incoming connections.
 */
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
