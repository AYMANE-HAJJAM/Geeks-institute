const express = require('express');
const Posts = require('../Models/posts.js');
const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
});
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newPost = await Posts.create(data);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedPost = await Posts.findByIdAndUpdate(id, data, { new: true }); 
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPost = await Posts.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
});
module.exports = router;
