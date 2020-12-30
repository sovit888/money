const express = require('express');
const router = express.Router();

const { singUp, login } = require('../controller/user');

router.post('/auth/signup', singUp);
router.post('/auth/login', login);

module.exports = router;
