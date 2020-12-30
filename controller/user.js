const User = require('../model/User');
const jwt = require('jsonwebtoken');
const upload = require('../multer');

exports.singUp = (req, res) => {
  const user = req.body;
  upload(req, res, (error) => {
    if (error || !req.file) {
      return res.status(401).json({ error: 'error with the files' });
    }
    const newUser = new User({ ...user, doccument_images: req.file.filename });
    user.save((error, savedUser) => {
      if (error || !savedUser) {
        return res.status(401).json({ error: 'cannt insert in database' });
      }
      return res.json({ message: 'inserted successfully' });
    });
  });
};

exports.login = (req, res) => {
  const { phone, password } = req.body;
  User.findOne({ phone }).exec((error, user) => {
    if (error || !user) {
      return res.status(401).json({ error: 'sorry no user exits' });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: 'sorry password do not match' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { expire: Date.now() + 360000 });
    return res.json({ token });
  });
};
