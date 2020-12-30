const expressJwt = require('express-jwt');
const User = require('../model/User');

exports.isSignedIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth'
});

exports.isAuthenticated = (req, res, next) => {
  User.findById(req.auth._id).exec((error, user) => {
    if (error || !user) {
      return res.status(401).json({ error: 'sorry token expired' });
    }
    req.user = user;
    next();
  });
};
