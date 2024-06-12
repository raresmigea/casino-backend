const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

const getUsers = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
  return data.map(user => ({
    ...user,
    wins: Math.floor(Math.random() * 100),
  }));
};

app.get('/api/leaderboard', async (req, res) => {
  try {
    const users = await getUsers();
    const topUsers = users.sort((a, b) => b.wins - a.wins).slice(0, 10);
    res.json(topUsers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
