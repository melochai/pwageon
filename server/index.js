require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();

const { SERVER, PORT } = process.env;

// console.log(process.env)

// app.use(express.static(path.resolve(__dirname, '../dist')));

// app.get('/api', (req, res) => {
//   res.json('yo');
// });

app.get('/anything', (req, res) => {
  res.json('yoo');
});

app.listen(PORT, () => console.log(`Listening on ${SERVER}:${PORT}`));
