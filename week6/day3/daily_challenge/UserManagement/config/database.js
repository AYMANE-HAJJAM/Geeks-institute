const knex = require('knex');

const db = knex({
  client: 'pg',  // PostgreSQL
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '0000',
    database: 'userManagement'
  }
});

module.exports = db;
