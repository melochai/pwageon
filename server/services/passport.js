const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../database');

passport.serializeUser((user, done) => {
  // user.id is not profile.id. why? Cause the user will definelty have an unique id from the database
  // but the user could not have a google_id, but might have a facebook_id, etc
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM app_user WHERE id = $1', [id]).then(user => {
    done(null, user[0]);
  });
});

// hey passport, I want you to be aware that a new strategy is availabe. here it is.
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: '/auth/google/callback',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    (accessToken, refreshToken, profile, done) => {
      db.query('SELECT * FROM app_user WHERE google_id = $1;', [profile.id])
        .then(existingUser => {
          if (existingUser.length) {
            done(null, existingUser[0]);
          } else {
            db.query('INSERT INTO app_user(google_id) VALUES($1) RETURNING *', [profile.id])
              .then(user => {
                done(null, user);
              })
              .catch(err => {
                throw err;
              });
          }
        })
        .catch(err => {
          throw err;
        });
    },
  ),
);
