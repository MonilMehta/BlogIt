import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark, faBookmark as faBookmarkRegular } from '@fortawesome/free-solid-svg-icons';

import './Home.css'; // Import CSS file

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleBookmarkToggle = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/blogs/${id}/toggleBookmark`);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === id ? { ...blog, bookmarked: !blog.bookmarked } : blog
      );
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  // Define getMostLikedBlogs outside the component rendering
  const getMostLikedBlogs = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    return sortedBlogs.slice(0, 3);
  };

  return (
    <div className='outer-container'>
      <div className="container">
        <h1 className="heading">All Blogs</h1>
        <div className="content">
          <div className="blogs-container">
            {Array.isArray(blogs) && blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog.id} className="blog-card">
                <div className='titlee'>
                  <h2>{blog.title}</h2>
                  <button className="bookmark-icon" onClick={() => handleBookmarkToggle(blog.id)}>
                    {blog.bookmarked ? (
                      <FontAwesomeIcon icon={solidBookmark} color="red" />
                    ) : (
                      <FontAwesomeIcon icon={faBookmarkRegular} color="gray" />
                    )}
                  </button>
                  </div>
                  {/* Check if blog.body is defined before rendering */}
                  {blog.body && <p>{blog.body.slice(0, 200)}...</p>}
                  <Link to={`/blogs/${blog.id}`} className="read-more">
                    Read More
                  </Link>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="sidebar">
            <h2>Most Liked</h2>
            <ul>
              {Array.isArray(blogs) && blogs.length > 0 ? (
                getMostLikedBlogs().map((blog) => (
                  <li key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </li>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
