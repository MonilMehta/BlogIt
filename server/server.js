import express from 'express';
import fs from 'fs';
const app = express();
const PORT = 3001;

app.use(express.json());

const blogsFilePath = './blogs.json';
const readBlogs = () => {
    const blogsData = fs.readFileSync(blogsFilePath);
    return JSON.parse(blogsData);
  };
  
  // Write blogs to JSON file
  const writeBlogs = (blogs) => {
    fs.writeFileSync(blogsFilePath, JSON.stringify(blogs, null, 2));
  };
  
  // Get all blogs
  app.get('/api/blogs', (req, res) => {
    const blogs = readBlogs();
    res.json(blogs);
  });
  
  // Create new blog
  app.post('/api/blogs', (req, res) => {
    const { title, content } = req.body;
    const blogs = readBlogs();
    const newBlog = { id: Date.now().toString(), title, content, bookmarked: false, likes: 0 };
    blogs.push(newBlog);
    writeBlogs(blogs);
    res.status(201).json(newBlog);
  });
  app.get('/api/blogs/:id', (req, res) => {
    const { id } = req.params;
    const blogs = readBlogs();
    const blog = blogs.find(blog => blog.id === id);
  
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
  
    res.json(blog);
  });
  
  // Toggle bookmark status of a blog
  app.put('/api/blogs/:id/toggleBookmark', (req, res) => {
    const { id } = req.params;
    const blogs = readBlogs();
    const updatedBlogs = blogs.map(blog =>
      blog.id === id ? { ...blog, bookmarked: !blog.bookmarked } : blog
    );
    writeBlogs(updatedBlogs);
    res.json({ message: 'Bookmark status updated successfully' });
  });

// Update blog
app.put('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const blogs = readBlogs();
  const updatedBlogs = blogs.map(blog =>
    blog.id === id ? { ...blog, title, content } : blog
  );
  writeBlogs(updatedBlogs);
  res.json({ message: 'Blog updated successfully' });
});

app.put('/api/blogs/:id/like', (req, res) => {
  const { id } = req.params;
  const blogs = readBlogs();
  const updatedBlogs = blogs.map((blog) =>
    blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
  );
  writeBlogs(updatedBlogs);
  res.json({ message: 'Blog liked successfully' });
});
app.put('/api/blogs/:id/unlike', (req, res) => {
  const { id } = req.params;
  const blogs = readBlogs();
  const updatedBlogs = blogs.map((blog) =>
    blog.id === id ? { ...blog, likes: blog.likes - 1 } : blog
  );
  writeBlogs(updatedBlogs);
  res.json({ message: 'Blog liked successfully' });
});
// Delete blog
app.delete('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  const blogs = readBlogs();
  const updatedBlogs = blogs.filter(blog => blog.id !== id);
  writeBlogs(updatedBlogs);
  res.json({ message: 'Blog deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
