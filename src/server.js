const jwt = require('jsonwebtoken');
const Application = require("./model/application");
const Account = require("./model/account");
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3001;
require('dotenv').config();

//app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Change '*' to your frontend URL in production
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)
  next();
});
function authenticateJWT(req, res, next) {
  const jwtToken = req.cookies.jwt;
  if(!jwtToken){
      return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const jwtPayload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = jwtPayload; // Attach user information to the request object
    next();
  } catch (error) {
    console.log(error)
    return res.status(403).json({ error: 'Invalid token' });
  }
}

app.get('/allApplications',authenticateJWT, async (req, res) => {
  data = await Application.listAllApplications()
  // console.log("server step:" + data)
  res.json(data)
});
app.post('/Login', async (req, res) => {
  try {
      const data = await Account.login(req);
      res.cookie('jwt', data.token, { httpOnly: true, domain: 'localhost'});//säger till client att skicka cookie med jwt token efter
      res.json(data.user);
  } catch (error) {
      console.error('Login error:', error);
      res.status(401).json({ error: 'Unauthorized' });
  }
});
app.get('/register', async (req, res) => {
  data = await Account.createAccount(req)
  // console.log("server step:" + data)
  console.log("data i server:"+data[0].exists)
  res.json(data[0].exists)
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});