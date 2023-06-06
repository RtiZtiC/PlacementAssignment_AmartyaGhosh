const express = require('express');
const app = express();

app.use(express.json());

// Array to store blog posts (dummy data)
let blogPosts = [
  { id: 1, title: 'First Blog Post', content: 'This is the content of the first blog post.' },
  { id: 2, title: 'Second Blog Post', content: 'This is the content of the second blog post.' }
];

// Get all blog posts
app.get('/blogs', (req, res) => {
  res.json(blogPosts);
});

// Get a specific blog post by ID
app.get('/blogs/:id', (req, res) => {
  const postId = Number(req.params.id);
  const blogPost = blogPosts.find(post => post.id === postId);

  if (blogPost) {
    res.json(blogPost);
  } else {
    res.status(404).json({ message: 'Blog post not found' });
  }
});

// Create a new blog post
app.post('/blogs', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: blogPosts.length + 1, title, content };
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

// Update a blog post by ID
app.put('/blogs/:id', (req, res) => {
  const postId = Number(req.params.id);
  const { title, content } = req.body;
  const index = blogPosts.findIndex(post => post.id === postId);

  if (index !== -1) {
    blogPosts[index] = { id: postId, title, content };
    res.json(blogPosts[index]);
  } else {
    res.status(404).json({ message: 'Blog post not found' });
  }
});

// Replace a blog post by ID
app.patch('/blogs/:id/upd', (req, res) => {
  const postId = Number(req.params.id);
  const { title, content } = req.body;
  const index = blogPosts.findIndex(post => post.id === postId);

  if (index !== -1) {
    blogPosts[index].title = title;
    blogPosts[index].content = content;
    res.json(blogPosts[index]);
  } else {
    res.status(404).json({ message: 'Blog post not found' });
  }
});

// Delete a blog post by ID
app.delete('/blogs/:id/del', (req, res) => {
  const postId = Number(req.params.id);
  const index = blogPosts.findIndex(post => post.id === postId);

  if (index !== -1) {
    const deletedPost = blogPosts.splice(index, 1);
    res.json(deletedPost[0]);
  } else {
    res.status(404).json({ message: 'Blog post not found' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
