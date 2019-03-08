const { Pool } = require('pg');

const connectionParameters = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const db = new Pool(connectionParameters);

module.exports = db;
