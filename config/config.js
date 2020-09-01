const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'well',
      password : 'umbrella7',
      database : 'smart-brain'
    }
  });

  module.exports = {
      knex: knex
  }