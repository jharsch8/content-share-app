// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Import the Content Model
const Content = require('./models/Content');

// Import the express library, which is a web framework for Node.js. Create an instance of the Express application.
const express = require('express');
const app = express();
// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware for Cross-Origin Resource Sharing
const cors = require('cors');
app.use(cors());

// Define the port the server will listen on. A common choice for development is 5000.
const port = 5000;

// Define a URL stub, or route/path, for the root URL ('/').
// When a user visits http://localhost:5000/, this function will be executed.
app.get('/', (req, res) => {
  // Send a simple text response back to the client.
  res.send('Welcome to the backend!');
});

// Define an API endpoint at '/api/content'.
// This is the route our frontend will use to get the content data.
app.get('/api/content', async (req, res) => {
  try {
    // Use the Content model to find all documents in the 'contents' collection
    const contentFromDB = await Content.find();
    res.json(contentFromDB);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// API Route to add new content to the MongoDB database
app.post('/api/content', async (req, res) => {
  try {
    // Create a new content item using data from the request body
    const newContent = new Content({
      title: req.body.title,
      description: req.body.description,
      mediaUrl: req.body.mediaUrl,
    });

    // Save the new content item to the database
    const content = await newContent.save();

    // Respond with the newly created item and a 201 status code (Created)
    res.status(201).json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// API Route to delete content from DB by ID
app.delete('/api/content/:id', async (req, res) => {
  try {
    // Find the content item by ID and remove it from the database
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) {
      return res.status(404).json({ msg: 'Content not found' });
    }
    // Respond with a success message
    res.json({ msg: 'Content deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Content not found' });
    }
    res.status(500).send('Server Error');
  } 
});

// Start the server and listen for incoming requests on the specified port.
app.listen(port, () => {
  // Log a message to the console to confirm the server is running.
  console.log(`Server is running on http://localhost:${port}`);
});