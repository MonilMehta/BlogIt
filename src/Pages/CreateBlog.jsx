import React, { useState } from 'react';
import axios from 'axios';
import './CreateBlog.css'; // Import CSS file

const CreateBlogPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [createdBlog, setCreatedBlog] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!title.trim() || !body.trim()) {
      setError('Please fill out both title and body fields.');
      return;
    }

    const newBlog = {
      title,
      body,
      bookmarked: false,
      likes: 0
    };

    try {
      const response = await axios.post('http://localhost:3001/api/blogs', newBlog);
      setCreatedBlog(response.data); // Set the created blog data received from the server
      setTitle('');
      setBody('');
      setError('');
    } catch (error) {
      console.error('Error creating blog:', error);
      setError('Failed to create blog. Please try again.');
    }
  };

  return (
    <div className="create-blog-container">
      <h1>Create New Blog</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="blog-form">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <textarea
          placeholder="Enter body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="textarea-field"
        ></textarea>
        <button type="submit" className="submit-button">Create Blog</button>
      </form>

      {/* Display newly created blog */}
      {createdBlog && (
        <div className="newly-created-blog">
          <h2>Newly Created Blog:</h2>
          <strong>{createdBlog.title}</strong>: {createdBlog.body}
        </div>
      )}
    </div>
  );
};

export default CreateBlogPage;
