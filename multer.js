const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
  destination: 'static/images/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage: storage }).single('userImage');
module.exports = upload;
