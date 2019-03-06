require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();
const { SERVER, PORT } = process.env;

// hey passport, I want you to be aware that a new strategy is availabe. here it is.
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    accessToken => {
      console.log('access Token: ', accessToken);
    },
  ),
);

// internally in GoogleStrategy has some code that says "I am known as 'google'"
app.get(
  '/auth/google',
  passport.authenticate('google', {
    // scope is us asking google to get profile and email. We can ask for more stuff
    scope: ['profile', 'email'],
  }),
);

// looks very similiar to above BUT passport will see that a code is attached to this url
// and handle the request differently
app.get('/auth/google/callback', passport.authenticate('google'));

app.listen(PORT, () => console.log(`Listening on ${SERVER}:${PORT}`));
