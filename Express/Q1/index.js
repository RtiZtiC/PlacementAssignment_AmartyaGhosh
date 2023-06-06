const express = require('express');
const app = express();


const posts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 2, title: 'Post 2' },
  { id: 20, title: 'Post 20' }
];


app.get('/', (req, res) => {
  res.json(posts);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
