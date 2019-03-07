const db = require('../database');
const { getRandomPigeonName, getIntBelowNum, getFloatBelowNum, calculateTimeInMS, getLatAndLongFromAddress } = require('../helperFunctions/user.js');

const pigeonNames = ['jim', 'bob', 'jane', 'alice', 'tim', 'peter', 'stephanie', 'carry'];

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const latAndLong = await getLatAndLongFromAddress(req.body.user_address);
    console.log('lat and long', latAndLong);
    req.body.address_lat = latAndLong.lat;
    req.body.address_long = latAndLong.long;
    
    const query = {
      text: `INSERT INTO app_user(user_name, user_address, google_id, address_lat, address_long) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      values: Object.values(req.body)
    };
    db.query(query.text, query.values)
      .then((data) => {
        console.log('data from createUser database creation', data.rows[0]);
        res.locals.newUser = data.rows[0];
        next();
      })
      .catch((err) => next(err))

  } catch (err) {
    next(err);
  }
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
    text: `INSERT INTO pigeon(user_id, pigeon_name, speed, stamina, durability, age, max_weight_capacity, percentage_live, image_url)
           VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
           RETURNING *`,
    values: values,
  };
  db.query(query.text, query.values)
    .then((data) => {
      console.log('data from createPigeon data creation', data.rows[0]);
      res.locals.newPigeon = data.rows[0];
      next();
    })
    .catch((err) => next(err))
}

userController.getAllUserPigeons = (req, res, next) => {
  const query = {
    text: `SELECT * FROM pigeon WHERE user_id = $1`,
    values: [req.body.user_id],
  }
  db.query(query.text, query.values)
    .then((data) => {
      console.log('data from getAllUserPigeons data creation', data.rows);
      res.locals.allPigeons = data.rows;
      next();
    })
    .catch((err) => next(err))
}

userController.makeContact = (req, res, next) => {
  const query = {
    text: `INSERT INTO contact(user_id, contact_id) VALUES($1, $2) RETURNING *`,
    values: [req.body.user_id, req.body.contact_id],
  };
  db.query(query.text, query.values)
    .then((data) => {
      console.log('data from makeContact data creation', data.rows[0]);
      res.locals.contactMade = data.rows[0];
      next();
    })
    .catch((err) => next(err))
}

userController.getContacts = (req, res, next) => {
  const query = {
    text: `SELECT * FROM app_user 
           INNER JOIN contact 
           ON contact.contact_id = app_user.id 
           WHERE contact.user_id = $1`,
    values: [req.body.user_id],
  };
  db.query(query.text, query.values)
    .then((data) => {
      console.log('data from getContacts data creation', data.rows);
      res.locals.userContacts = data.rows;
      next();
    })
    .catch((err) => next(err))
}

userController.sendMessage = async (req, res, next) => {
  try {
    // If the user has provided a user name, but no address and no email address
    if (typeof req.body.user_receiving_id === 'string') {
      // do a look up to find the id of the username and the address, based on the username
      console.log(req.body);
      const queryUser = {
        text: `SELECT * FROM app_user WHERE id = $1 OR user_name = $2`,
        values: [req.body.user_sending_id, req.body.user_receiving_id]
      };
      const userInfo = await db.query(queryUser.text, queryUser.values);
      console.log('userInfo', userInfo.rows);
      // update req body to represent the user we looked up
      req.body.user_receiving_id = userInfo.rows[0].id;
      req.body.delivery_address = userInfo.rows[0].user_address;
      req.body.date_sent = new Date(Date.now());
      req.body.date_to_deliver = new Date(Date.now() + calculateTimeInMS(2000, 30));

      // set the latitude and longitude
      const latAndLong = await getLatAndLongFromAddress(req.body.delivery_address);
      req.body.delivery_lat = latAndLong.lat;
      req.body.delivery_long = latAndLong.long;
      console.log('++++++++++++++++++++++++++++');
      console.log('lat and long!', latAndLong);
      console.log('++++++++++++++++++++++++++++');

      const messageQuery = {
        text: `INSERT INTO message(user_sending_id, user_receiving_id, pigeon_sending_id, message_text, email_address, delivery_address, date_to_deliver, image_url, date_sent, delivery_lat, delivery_long)
               VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
               RETURNING *`,
        values: Object.values(req.body),
      };
      db.query(messageQuery.text, messageQuery.values)
        .then((data) => {
          console.log('data from the first sendMessage path data creation', data.rows[0]);
          res.locals.messageSent = data.rows[0];
          next();
        })
        .catch((err) => next(err));

    // if the user has provided an email address and delivery address
    } else if (req.body.email_address && req.body.delivery_address) {

      const queryUser = {
        text: `SELECT * FROM app_user WHERE id = $1 OR id = $2`,
        values: [req.body.user_sending_id, req.body.user_receiving_id]
      };
      const userInfo = await db.query(queryUser.text, queryUser.values);

      console.log('userInfo', userInfo.rows);

      // set the latitude and longitude
      const latAndLong = await getLatAndLongFromAddress(req.body.delivery_address);
      console.log('++++++++++++++++++++++++++++');
      console.log('lat and long!', latAndLong);
      console.log('++++++++++++++++++++++++++++');
      req.body.delivery_lat = latAndLong.lat;
      req.body.delivery_long = latAndLong.long;

      

      // Set date sent as the current date and set the delivery data as being a date in the future bases on pigeon speed and distance from person to person
      req.body.date_sent = new Date(Date.now());
      req.body.date_to_deliver = new Date(Date.now() + calculateTimeInMS(2000, 30));


      const messageQuery = {
        text: `INSERT INTO message(user_sending_id, user_receiving_id, pigeon_sending_id, message_text, email_address, delivery_address, date_to_deliver, image_url, date_sent, delivery_lat, delivery_long)
               VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
               RETURNING *`,
        values: Object.values(req.body),
      };
      db.query(messageQuery.text, messageQuery.values)
        .then((data) => {
          console.log('data from the other second sendMessage path data creation', data.rows[0]);
          res.locals.messageSent = data.rows[0];
          next();
        })
        .catch((err) => next(err));
    }
  } catch (err) {
    next(err);
  }
}

module.exports = userController;