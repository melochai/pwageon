const passport = require('passport');

module.exports = app => {
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

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });
};
