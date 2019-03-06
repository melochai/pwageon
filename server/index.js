require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');

const app = express();

const { SERVER, PORT } = process.env;

// hey passport, I want you to be aware that a new strategy is availabe. here it is.
passport.use(new GoogleStrategy());

app.get('/anything', (req, res) => {
  res.json('yoo');
});

app.listen(PORT, () => console.log(`Listening on ${SERVER}:${PORT}`));
