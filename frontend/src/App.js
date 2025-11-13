import React, {useState, useEffect, use} from 'react';
import './App.css';
import ContentForm from './ContentForm';


function App() {
  const [content, setContent] = useState([]);

// Function to fetch data from the backend API
  useEffect(() => {
    fetch('http://localhost:5000/api/content')
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('Error fetching content:', error));
  }, []); // Empty dependency array means this runs once on component mount

  // Function to update state when new content is added via the form
  const handleContentAdded = (newContent) => {
    // Prepend the new content to the existing list to show it immediately
    setContent([newContent, ...content]);
  };

  // Function to handle content deletion
  const handleContentDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/content/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Filter out the deleted item from the current state
        setContent(content.filter(item => item._id !== id));
        alert('Content deleted successfully');
      } else {
        alert('Failed to delete content');
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      alert('Error deleting content');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Content Share App MVP</h1>
      </header>
      <ContentForm onContentAdded={handleContentAdded} />
     
    <main>
        {content.length > 0 ? (
          // 3. Map over the 'content' state to display each item
          content.map(item => (
            <div key={item._id} className="content-item">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <img 
                src={item.mediaUrl} 
                alt={item.title} 
                style={{ maxWidth: '400px', height: 'auto' }} 
              />
              <br/>
              <button onClick={() => handleContentDelete(item._id)}>Delete content: {item.title}</button> 
            </div>
          ))
        ) : (
          <p>Loading content or database is empty...</p>
        )}
      </main>
    </div>
);
}

export default App;
