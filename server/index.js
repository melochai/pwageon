require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

const { SERVER, PORT } = process.env;

app.use(express.static(path.resolve(__dirname, '../client')));

app.listen(PORT, () => console.log(`Listening on ${SERVER}:${PORT}`));
