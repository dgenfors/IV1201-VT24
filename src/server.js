const { Pool } = require('pg');
const Application = require("./model/application");
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
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});