const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(bodyParser.json());

const secretKey = 'hello@ineuron';

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/login.html'));
});

app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, '/success.html'));
});

app.get('/faliure', (req, res) => {
  res.sendFile(path.join(__dirname, '/failure.html'));
});

app.post('/login', (req, res) => {

    const name = req.body.name;
    const password = req.body.password;
    console.log(name);
    console.log(password);

  const predefinedUsername = 'amartya';
  const predefinedPassword = '12345';

  if (name === predefinedUsername && password === predefinedPassword) {
    const token = jwt.sign({ name }, secretKey);
    res.sendFile(path.join(__dirname, '/success.html'));
  } else {
    res.sendFile(path.join(__dirname, '/faliure.html'));
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

app.get('/protected_route', verifyToken, (req, res) => {
  res.json({ message: 'Route accessed successfully' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
