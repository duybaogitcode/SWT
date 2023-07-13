const axios = require('axios');

async function getUserData(userId) {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
}

async function processUserData(userId) {
  const userData = await getUserData(userId);

  console.log('data trả về: ' + JSON.stringify(userData));

  let processedData;
  if (userData.completed) {
    processedData = 'Checked';
  } else {
    processedData = '!Checked';
  }

  return processedData;
}

module.exports = {
  getUserData,
  processUserData,
};
