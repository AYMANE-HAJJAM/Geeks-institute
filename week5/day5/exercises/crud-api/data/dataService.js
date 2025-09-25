// data/dataService.js
import axios from 'axios';

// Function to fetch all posts from JSONPlaceholder
export const fetchPosts = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data; // Return array of posts
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    throw error; // Rethrow error to handle it in the calling function
  }
};
