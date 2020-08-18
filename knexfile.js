require('dotenv').config();
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
  },

  staging: {
    client: 'pg',
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
  },

  production: {
    client: 'pg',
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
  }

};