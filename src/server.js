const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes

app.get('/', (req, res) => {
  res.send('Hello there!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});