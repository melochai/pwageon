require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const userController = require('./controllers/userController');
const keys = require('./config/keys');

const app = express();
const SERVER = process.env.SERVER || 'http://localhost';
const PORT = process.env.PORT || 3000;
require('./services/passport');

app.use(cors());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../dist')));
require('./routes/authRoutes')(app);

app.post('/createUser', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.newUser);
});

app.post('/createPigeon', userController.createPigeon, (req, res) => {
  res.status(200).json(res.locals.newPigeon);
});

// TODO: need to implement a way to only use a the logged in usersID for the getAllUserPigeons
app.post('/getAllUserPigeons', userController.getAllUserPigeons, (req, res) => {
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

app.use((error, request, response, next) => {
  console.log('Error coming from next:', error);
  return response.status(error.status || 500).json({
    error: {
      message: error.message || 'Oops! Something went wrong.',
    },
  });
});

app.listen(PORT, () => console.log(`Listening on ${SERVER}:${PORT}/`));
