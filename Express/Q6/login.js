const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  axios.post('/login', { username, password })
    .then(response => {
      const token = response.data.token;
      console.log('Login successful. Token:', token);
    })
    .catch(error => {
      console.error('Login failed:', error.response.data.message);
    });
});
