// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Import the express library, which is a web framework for Node.js.
const express = require('express');

// Create an instance of the Express application.
const app = express();

// Define the port the server will listen on. A common choice for development is 5000.
const port = 5000;

// Hard-coded data to simulate a database response.
// In a real application, this data would come from a database like MongoDB or PostgreSQL.
const content = [
  {
    id: 1,
    title: 'First Post',
    description: 'This is the first piece of content.',
    mediaUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: 2,
    title: 'Second Post',
    description: 'This is the second piece of content.',
    mediaUrl: 'https://placehold.co/400x600.png',
  },
  {
    id: 3,
    title: 'Third Post',
    description: 'This is the third piece of content.',
    mediaUrl: 'https://placehold.co/600x400.png',
  },
];

// Define a URL stub, or route/path, for the root URL ('/').
// When a user visits http://localhost:5000/, this function will be executed.
app.get('/', (req, res) => {
  // Send a simple text response back to the client.
  res.send('Welcome to the backend!');
});

// Define an API endpoint at '/api/content'.
// This is the route our frontend will use to get the content data.
app.get('/api/content', (req, res) => {
  // Send the 'content' array as a JSON response.
  res.json(content);
});

// Start the server and listen for incoming requests on the specified port.
app.listen(port, () => {
  // Log a message to the console to confirm the server is running.
  console.log(`Server is running on http://localhost:${port}`);
});