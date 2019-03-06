require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userController = require('./controllers/userController');
const keys = require('./config/keys');

const app = express();
const { SERVER, PORT } = process.env;

/* ----------------------- OAuth2.0 ----------------------- */
// hey passport, I want you to be aware that a new strategy is availabe. here it is.
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access Token: ', accessToken);
      console.log('refreshToken: ', refreshToken);
      console.log('profile: ', profile);
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

/* ----------------------- OAuth2.0 ----------------------- */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../dist')));

app.post('/createUser', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.newUser);
});

app.post('/createPigeon', userController.createPigeon, (req, res) => {
  res.status(200).json(res.locals.newPigeon);
});

// TODO: need to implement a way to only use a the logged in usersID for the getAllUserPigeons
app.get('/getAllUserPigeons', userController.getAllUserPigeons, (req, res) => {
  res.status(200).json(res.locals.allPigeons);
});

app.post('/makeContact', userController.makeContact, (req, res) => {
  res.status(200).json(res.locals.contactMade);
});

app.get('/getUserContacts', userController.getContacts, (req, res) => {
  res.status(200).json(res.locals.userContacts);
});

app.post('/sendMessage', userController.sendMessage, (req, res) => {
  res.status(200).json(res.locals.messageSent);
});

app.get('/api', (req, res) => {
  res.json('yo');
});

app.use((error, request, response, next) => {
  console.log('Error coming from next:', error);
  return response.status(error.status || 500).json({
    error: {
      message: error.message || 'Oops! Something went wrong.',
    },
  });
});

app.listen(PORT, () => console.log(`Listening on ${SERVER}:${PORT}`));
