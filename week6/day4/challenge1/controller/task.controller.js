const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../models/tasks.json');
function readTasks() {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

function writeTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}
const getTasks = (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
};
const getTask = (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
};
const createTask = (req, res) => {
    const tasks = readTasks();
    const newTask = { id: uuidv4(), ...req.body };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json({ message: 'Task created successfully', task: newTask });
};
const updateTask = (req, res) => {
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Task not found' });

    tasks[index] = { ...tasks[index], ...req.body };
    writeTasks(tasks);
    res.json({ message: 'Task updated successfully', task: tasks[index] });
};
const deleteTask = (req, res) => {
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Task not found' });

    const deletedTask = tasks.splice(index, 1);
    writeTasks(tasks);
    res.json({ message: 'Task deleted successfully', task: deletedTask[0] });
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
