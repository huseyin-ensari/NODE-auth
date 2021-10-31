const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = function (passport) {
  const options = {
    usernameField: 'email',
    passwordField: 'password',
  };

  passport.use(
    new LocalStrategy(options, async (email, password, done) => {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      bcrypt.compare(password, user.password).then((isTrue) => {
        if (!isTrue) {
          return done(null, false, { message: 'Wrong password' });
        }

        return done(null, user);
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, foundedUser) {
      const user = {
        id: foundedUser.id,
        name: foundedUser.name,
        lastname: foundedUser.lastname,
        email: foundedUser.email,
      };
      done(err, user);
    });
  });
};
