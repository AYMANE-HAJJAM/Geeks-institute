import express from "express";
import axios from "axios";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API_URL = "https://jsonplaceholder.typicode.com/posts";

app.get("/api/posts", async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        const posts = response.data;
        console.log("Data successfully retrieved from JSONPlaceholder API");
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ message: "Failed to fetch posts" });
    }
});

app.get("/api/posts/:id", async (req, res) => {
    const postId = req.params.id;
    try {
        const response = await axios.get(`${API_URL}/${postId}`);
        const post = response.data;
        console.log(`Data successfully retrieved for post ID: ${postId}`);
        res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post:", error.message);
        res.status(500).json({ message: "Failed to fetch post" });
    }
});


app.post("/api/posts", async (req, res) => {
    try {
        const response = await axios.post(API_URL, req.body);
        const newPost = response.data;
        console.log("New post created successfully");
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error.message);
        res.status(500).json({ message: "Failed to create post" });
    }
});


app.put("/api/posts/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const response = await axios.put(`${API_URL}/${postId}`, req.body);
        const updatedPost = response.data;
        console.log(`Post updated successfully: ${postId}`);
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error.message);
        res.status(500).json({ message: "Failed to update post" });
    }
});

app.delete("/api/posts/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        await axios.delete(`${API_URL}/${postId}`);
        console.log(`Post deleted successfully: ${postId}`);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting post:", error.message);
        res.status(500).json({ message: "Failed to delete post" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
