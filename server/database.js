const pgp = require('pg-promise')({});

const connectionParameters = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const db = pgp(connectionParameters);

db.proc('version')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

// db.query('SELECT * FROM information_schema.tables WHERE table_name = $1', ['user'])
//   .then((data) => {
//     console.log('query results!:', data);
//   })
//   .catch((err) => {
//     console.log(err)
//   })

module.exports = db;
