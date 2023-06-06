const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Database of blogs (temporary)
let blogs = [];

// Route: Get all blogs
app.get('/blogs', (req, res) => {
  res.json(blogs);
});

// Route: Add a new blog
app.post('/blogs', (req, res) => {
  const newBlog = req.body;
  blogs.push(newBlog);
  res.json(newBlog);
});

// Route: Get a specific blog by ID
app.get('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  const blog = blogs.find((blog) => blog.id === blogId);

  if (!blog) {
    res.status(404).json({ error: 'Blog not found' });
  } else {
    res.json(blog);
  }
});

// Route: Update a specific blog by ID
app.put('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  const updatedBlog = req.body;

  const index = blogs.findIndex((blog) => blog.id === blogId);
  if (index === -1) {
    res.status(404).json({ error: 'Blog not found' });
  } else {
    blogs[index] = updatedBlog;
    res.json(updatedBlog);
  }
});

// Route: Replace a specific blog by ID
app.patch('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  const updatedFields = req.body;

  const index = blogs.findIndex((blog) => blog.id === blogId);
  if (index === -1) {
    res.status(404).json({ error: 'Blog not found' });
  } else {
    blogs[index] = { ...blogs[index], ...updatedFields };
    res.json(blogs[index]);
  }
});

// Route: Delete a specific blog by ID
app.delete('/blogs/:id', (req, res) => {
  const blogId = req.params.id;

  const index = blogs.findIndex((blog) => blog.id === blogId);
  if (index === -1) {
    res.status(404).json({ error: 'Blog not found' });
  } else {
    const deletedBlog = blogs.splice(index, 1);
    res.json(deletedBlog[0]);
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
