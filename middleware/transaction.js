const User = require('../model/User');
exports.getReceiver = (req, res, next, id) => {
  User.findById(id).exec((error, receiver) => {
    if (error || !receiver) {
      return res.status(401).json({ error: 'no receiver' });
    }
    req.receiver = receiver;
    next();
  });
};
