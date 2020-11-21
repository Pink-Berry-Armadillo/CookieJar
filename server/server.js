const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { dirname } = require('path');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const db = require('../db/userModels');
const { errorMonitor } = require('events');

//----------------------------------------- END OF IMPORTS---------------------------------------------------

// Set up server
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
);

app.use(
  session({
    secret: 'mySecret',
    resave: true,
    // saveUnitialized: true,
  })
);

app.use(cookieParser('mySecret'));

// Initialize passport
app.use(passport.initialize());

app.use(passport.session());

// configuration to create an instance of new local strategy when user logs in

passport.use(
  new LocalStrategy(function (username, password, done) {
    db.query(
      'SELECT id, username, type FROM users WHERE id = $1',
      [parseInt(id, 10)],
      function (err, users) {
        if (err) {
          return done(err);
        }
        if (!users.rows[0]) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (users.rows.length > 0) {
          const user = users.rows[0];
          bcrypt.compare(password, user.password, (err, bool) => {
            if (err) {
              return done(err);
            }
            if (bool) {
              return done(null, users.rows[0]);
            } else {
              return done(null, false);
            }
          });
        }
      }
    );
  })
);

// passport configuration for serialization of user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//configuration for deserialization of user id

passport.deserializeUser(function (id, done) {
  db.query(
    'SELECT id, username, type FROM users WHERE id = $1',
    [parseInt(id, 10)],
    function (err, users) {
      if (err) {
        return done(err);
      } else {
        return done(null, users.rows[0]);
      }
    }
  );
});

app.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

app.post('/register', (req, res, next) => {
  // Update the database with the username and password
  // get the password attribute value and pass it along with a salt to the bycrpty hash method to get the hashed password
  const hashed = bcrypt.hash(req.body.password, 10);
  // insert into the users table a row with the value of the username property in req.body as the column username and the value of the hashed password as the column password
  const values = [req.body.username, hashed];
  console.log('register is working ', res);
  db.query('INSERT INTO users (username, password) VALUES ($1, $2)', values)
    .then((data) => {
      console.log(data);
      return res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/register');
    });
  // .catch(
  //   return rest.redirect('/register');
  //   return err;
  // )
});

// catch all route handler
app.use((req, res) => res.status(404).send('Page not found: Try a different end point'));

// Express error handler for middleware
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: {
      err:
        'An error occurred. Please contact a technical representative for help.',
    },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app.listen(port, () =>
  console.log(`server is listening at ${port}`)
);
