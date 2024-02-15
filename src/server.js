const { Pool } = require('pg');
const Application = require("./model/application");
const Account = require("./model/account");
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes

app.get('/user', (req, res) => {
  process.env.SERVER_HOST
  res.send('Hello there!');
});
app.get('/allApplications', async (req, res) => {
  data = await Application.listAllApplications()
  // console.log("server step:" + data)
  res.json(data)
});
app.get('/Login', async (req, res) => {
  data = await Account.login(req)
  // console.log("server step:" + data)
  console.log("data i server:"+data[0].exists)
  res.json(data[0].exists)
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});