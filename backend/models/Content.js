const mongoose = require('mongoose');

// Define the schema for our content
const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    mediaUrl: {
        type: String,
        required: true,
    },
});

// Create the Content model from the schema
const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;