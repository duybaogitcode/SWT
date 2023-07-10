const express = require('express');
const app = express();
const port = 8080;
const axios = require('axios');

app.get('/', async (req, res) => {
  try {
    const userId = '1';
    const userData = await getUserData(userId);
    res.send(`User data: ${userData}`);
  } catch (error) {
    res.status(500).send('Failed to fetch user data');
  }
});

async function getUserData(userId) {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
