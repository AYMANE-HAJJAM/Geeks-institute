const Todo = require('../models/todo.js');
const { v4: uuidv4 } = require('uuid');
const gettodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const gettodo = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const createtodo = async (req, res) => {
  try {
    const data = { id: uuidv4(), ...req.body };
    const [newTodo] = await Todo.create(data);
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updatetodo = async (req, res) => {
  try {
    const [updated] = await Todo.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deletetodo = async (req, res) => {
  try {
    await Todo.destroy(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { gettodos, gettodo, createtodo, updatetodo, deletetodo };
