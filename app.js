// Import the Express library
const express = require('express');
const app = express();

// Define a route for "/"
app.get('/', (req, res) => {
  res.send('This is the version 1.1 of demo app');
});

// Start the server
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
