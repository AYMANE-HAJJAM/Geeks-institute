const db = require('../controllers/database.js');
const Todo = {
  findAll: () => db('todos').select('*'),
  findByPk: (id) => db('todos').where({ id }).first(),
  create: (data) => db('todos').insert(data).returning('*'), // returning خاص PostgreSQL
  update: (id, data) => db('todos').where({ id }).update(data).returning('*'),
  destroy: (id) => db('todos').where({ id }).del()
};

module.exports = Todo;
