const db = require('../database');

const pigeonNames = ['jim', 'bob', 'jane', 'alice', 'tim', 'peter', 'stephanie', 'carry'];

function getRandomPigeonName(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
}

function getIntBelowNum(num) {
  return Math.floor(Math.random() * num);
}

function getFloatBelowNum(num) {
  return Math.random() * num;
}

const userController = {};

userController.createUser = (req, res, next) => {
  const query = {
    text: `INSERT INTO app_user(user_name, user_address) VALUES($1, $2) RETURNING *`,
    values: Object.values(req.body)
  };
  db.query(query.text, query.values)
    .then((data) => {
      console.log('data from createUser database creation', data);
      res.locals.newUser = data;
      next();
    })
    .catch((err) => {
      next(err);
    })
}

userController.createPigeon = (req, res, next) => {
  const values = [req.body.user_id];
  //name
  values.push(getRandomPigeonName(pigeonNames));
  //speed
  values.push(getIntBelowNum(100));
  // stamina
  values.push(getIntBelowNum(100));
  //durability
  values.push(getIntBelowNum(100));
  //age
  values.push(getIntBelowNum(20));
  // get max_weight_capacity
  values.push(getFloatBelowNum(2))
  // percentage_live
  values.push(getFloatBelowNum(12));
  values.push(req.body.image_url);
  const query = {
    text: `INSERT INTO pigeon(user_id, pigeon_name, speed, stamina, durability, age, max_weight_capacity, percentage_live, image_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    values: values,
  }
  db.query(query.text, query.values)
    .then((data) => {
      console.log('data from createPigeon data creation', data);
      res.locals.newPigeon = data;
      next();
    })
    .catch((err) => {
      next(err);
    })
}

userController.getAllUserPigeons = (req, res, next) => {
  const query = {
    text: `SELECT * FROM pigeon WHERE user_id = $1`,
    values: [req.body.user_id],
  }
  db.query(query.text, query.values)
    .then((data) => {
      console.log('data from getAllUserPigeons data creation', data);
      res.locals.allPigeons = data;
      next();
    })
    .catch((err) => {
      next(err);
    })
}

userController.makeContact = (req, res, next) => {
  const query = {
    text: `INSERT INTO contact(user_id, contact_id) VALUES($1, $2) RETURNING *`,
    values: [req.body.user_id, req.body.contact_id],
  };
  db.query(query.text, query.values)
    .then((data) => {
      console.log('data from makeContact data creation', data);
      res.locals.contactMade = data;
      next();
    })
    .catch((err) => {
      next(err);
    })
}

userController.getContacts = (req, res, next) => {
  const query = {
    text: `SELECT * FROM app_user INNER JOIN contact ON contact.user_id = app_user.id WHERE user_id = $1`,
    values: [req.body.user_id],
  };
  db.query(query.text, query.values)
    .then((data) => {
      console.log('data from getContacts data creation', data);
      res.locals.userContacts = data;
      next();
    })
    .catch((err) => {
      next(err);
    })
}

userController.sendMessage = async (req, res, next) => {
  console.log(req.body);
  try {
    if (typeof req.body.user_receiving_id === 'string') {
      // do a look up to find the id of the username and the address, based on the username
      console.log('hello');
      const queryUser = {
        text: `SELECT * FROM app_user WHERE user_name = $1`,
        values: [req.body.user_receiving_id]
      };
      const userInfo = await db.query(queryUser.text, queryUser.values);
      // update req body to represent the found look up
      req.body.user_receiving_id = userInfo[0].id;
      req.body.delivery_address = userInfo[0].user_address;
      const messageQuery = {
        text: `INSERT INTO message(user_sending_id, user_receiving_id, pigeon_sending_id, message_text, email_address, delivery_address, date_to_deliver, image_url, date_sent) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        values: Object.values(req.body),
      };
      db.query(messageQuery.text, messageQuery.values)
        .then((data) => {
          console.log('data from the first sendMessage path data creation', data);
          res.locals.messageSent = data;
          next();
        })
        .catch((err) => {
          next(err);
        });
    } else if (req.body.email_address && req.body.delivery_address) {
      const messageQuery = {
        text: `INSERT INTO message(user_sending_id, user_receiving_id, pigeon_sending_id, message_text, email_address, delivery_address, date_to_deliver, image_url, date_sent) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        values: Object.values(req.body),
      };
      db.query(messageQuery.text, messageQuery.values)
        .then((data) => {
          console.log('data from the other second sendMessage path data creation', data);
          res.locals.messageSent = data;
          next();
        })
        .catch((err) => {
          next(err);
        });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = userController;