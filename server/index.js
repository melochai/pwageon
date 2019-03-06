require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
require('./services/passport');

const app = express();
const { SERVER, PORT } = process.env;
require('./routes/authRoutes')(app);

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
