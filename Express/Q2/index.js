const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

function delayRedirect(req, res, next) {
    setTimeout(next, 5000);
  }

app.post('/login',delayRedirect ,(req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  const predefinedName = 'amartya';
  const predefinedPassword = '12345';

  if (name === predefinedName && password === predefinedPassword) {
    res.redirect('/success');
  } else {
    res.redirect('/failure');
  }
});

app.get('/success', function (req, res) {
  res.sendFile(path.join(__dirname, 'success.html'));
});

app.get('/failure', function (req, res) {
  res.sendFile(path.join(__dirname, 'faliure.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
