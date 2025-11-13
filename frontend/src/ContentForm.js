import React, { useState } from 'react';
import './ContentForm.css'; // We'll create this CSS file next

function ContentForm({ onContentAdded }) {
  // 1. State to manage the input fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');

  // 2. Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form refresh

    const newContent = { title, description, mediaUrl };

    try {
      const response = await fetch('http://localhost:5000/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContent),
      });

      if (response.status === 201) {
        // Success: Clear the form and notify the parent component
        const addedContent = await response.json();
        onContentAdded(addedContent); // Function to update the content list
        setTitle('');
        setDescription('');
        setMediaUrl('');
        alert('Content posted successfully!');
      } else {
        alert('Failed to post content. Check server status.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while connecting to the server.');
    }
  };

  return (
    <div className="content-form-container">
      <h2>Add New Content</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Media URL</label>
          <input
            type="url"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Post Content</button>
      </form>
    </div>
  );
}

export default ContentForm;