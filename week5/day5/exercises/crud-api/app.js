import express from 'express';
import { fetchPosts } from './data/dataService.js';

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Route to get all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await fetchPosts(); // Fetch posts from JSONPlaceholder
    console.log('Data successfully retrieved from JSONPlaceholder API');
    res.status(200).json(posts); // Send posts as JSON response
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
