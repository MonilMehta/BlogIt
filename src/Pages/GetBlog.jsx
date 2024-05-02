import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GetBlog.css'; // Import CSS file

const GetBlogPage = () => {
  const { id } = useParams(); // Get the blog ID from URL params
  const history = useNavigate(); // For navigation
  const [blog, setBlog] = useState(null); // State to hold the fetched blog

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/blogs/${id}`);
        setBlog(response.data); // Set the fetched blog to state
      } catch (error) {
        console.error('Error fetching blog:', error);
        history('/'); // Redirect to homepage on error
      }
    };

    fetchBlog(); // Call the fetchBlog function when component mounts
  }, [id, history]);

  const handleLike = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1
      };
      const response = await axios.put(`http://localhost:3001/api/blogs/${id}/like`);
      setBlog(updatedBlog); // Update local state with new likes count
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };
  const handleUnLike = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes - 1
      };
      const response = await axios.put(`http://localhost:3001/api/blogs/${id}/unlike`);
      setBlog(updatedBlog); // Update local state with new likes count
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleToggleBookmark = async () => {
    try {
      const updatedBlog = {
        ...blog,
        bookmarked: !blog.bookmarked
      };
      const response = await axios.put(`http://localhost:3001/api/blogs/${id}/toggleBookmark`);
      setBlog(updatedBlog); // Update local state with new bookmark status
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/blogs/${id}`);
      history('/'); // Redirect to homepage after deleting the blog
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };


  return (
    <div className="container">
      {blog ? (
        <div>
          <h1 className="blog-title">{blog.title}</h1>
          <p className="blog-content">{blog.body}</p>
          <button className="button" onClick={handleLike}>Like ({blog.likes})</button>
          <button className="button" onClick={handleUnLike}>Unlike</button>
          <button className="button" onClick={handleDelete}>Delete</button>
          {/* Add edit functionality if needed */}
        </div>
      ) : (
        <p className="error-message">Blog not found.</p>
      )}
    </div>
  );
};

export default GetBlogPage;
