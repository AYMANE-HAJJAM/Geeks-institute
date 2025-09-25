import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let todos = []; // In-memory todo storage
let nextId = 1; // Simple ID generator

app.post("/api/todos", (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = { id: nextId++, title, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.get("/api/todos", (req, res) => {
    res.json(todos);
});

app.get("/api/todos/:id", (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);
    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
});

app.put("/api/todos/:id", (req, res) => {
    const todoId = parseInt(req.params.id);
    const { title, completed } = req.body;
    const todo = todos.find(t => t.id === todoId);
    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }
    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
    const todoId = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === todoId);
    if (index === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }
    const deletedTodo = todos.splice(index, 1);
    res.json(deletedTodo);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
