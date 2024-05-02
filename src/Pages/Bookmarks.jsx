import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark, faBookmark as faBookmarkRegular } from '@fortawesome/free-solid-svg-icons';
import './Bookmarks.css'; // Import CSS file

const BookmarksPage = () => {
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);

  useEffect(() => {
    fetchBookmarkedBlogs();
  }, []);

  const fetchBookmarkedBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/bookmarkedBlogs');
      setBookmarkedBlogs(response.data);
    } catch (error) {
      console.error('Error fetching bookmarked blogs:', error);
    }
  };

  const handleBookmarkToggle = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/blogs/${id}/toggleBookmark`);
      // Refetch bookmarked blogs after toggling to update the state
      fetchBookmarkedBlogs();
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const renderBookmarks = () => {
    if (bookmarkedBlogs.length === 0) {
      return (
        <div className="empty-message">
          <p>No bookmarked blogs found.</p>
          <p>Create your own blog <Link to="/create">here</Link>.</p>
        </div>
      );
    } else {
      return (
        <div className="bookmarks-container">
          {bookmarkedBlogs.map(blog => (
            <div key={blog.id} className="bookmark-item">
              <h2>{blog.title}</h2>
              <button className="bookmark-icon" onClick={() => handleBookmarkToggle(blog.id)}>
                {blog.bookmarked ? (
                  <FontAwesomeIcon icon={solidBookmark} color="red" />
                ) : (
                  <FontAwesomeIcon icon={faBookmarkRegular} color="gray" />
                )}
              </button>
              <p>{blog.body.slice(0, 200)}...</p>
              <Link to={`/blogs/${blog.id}`} className="read-more">Read More</Link>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Bookmarked Blogs</h1>
      {renderBookmarks()}
    </div>
  );
};

export default BookmarksPage;
