import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home';
import BlogDetailPage from './Pages/GetBlog';
import CreateBlogPage from './Pages/CreateBlog';
import BookmarksPage from './Pages/Bookmarks';
import Navbar from './Pages/Navbar';
import './App.css';

const App = () => {
  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/blogs/:id" element={<BlogDetailPage/>} />
        <Route path="/create" element={<CreateBlogPage/>} />
        <Route path="/bookmarks" element={<BookmarksPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
