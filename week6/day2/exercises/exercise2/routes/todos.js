import express from 'express';

const router = express.Router();

const todos = [
    { id: 1, task: "Buy groceries", completed: false },
    { id: 2, task: "Walk the dog", completed: true },
    { id: 3, task: "Read a book", completed: false }
];

router.get('/', (req, res) => {
    try {
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/', (req, res) => {
    try {
        const { task } = req.body;
        if (!task) {
            return res.status(400).json({ message: "Task is required" });
        }
        const newTodo = {
            id: todos.length + 1,
            task,
            completed: false
        };
        todos.push(newTodo);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { task, completed } = req.body;
        const todo = todos.find(t => t.id === parseInt(id));
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        if (task !== undefined) {
            todo.task = task;
        }
        if (completed !== undefined) {
            todo.completed = completed;
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const index = todos.findIndex(t => t.id === parseInt(id));
        if (index === -1) {
            return res.status(404).json({ message: "Todo not found" });
        }
        const deletedTodo = todos.splice(index, 1);
        res.status(200).json(deletedTodo[0]);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;