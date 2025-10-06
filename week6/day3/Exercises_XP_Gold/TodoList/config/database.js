const knex = require('knex');
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '0000',
    database: 'blog-api'
  }
});
module.exports = db;
