const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../database');
const keys = require('../config/keys');

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
      db.query('SELECT * FROM app_user WHERE google_id = $1;', [profile.id])
        .then(existingUser => {
          if (existingUser.length) {
            // we already have a record
            console.log('it exists in the database');
          } else {
            db.query('INSERT INTO app_user(google_id) VALUES($1) RETURNING *', [profile.id])
              .then(data => {
                console.log('data from signing up google', data);
              })
              .catch(err => console.log('errrr', err));
          }
        })
        .catch(err => console.log('errrr', err));
    },
  ),
);
