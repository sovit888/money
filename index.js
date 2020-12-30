require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const path = require('path');

const app = express();

mongoose.connect('mongodb://localhost:27017/bank', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(bodyparser.json());
app.use(cookieparser());
app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'static')));

const userRoutes = require('./route/user');
const transactionRoutes = require('./route/transaction');

app.use('/api', userRoutes);
app.use('/api', transactionRoutes);

app.listen(process.env.PORT);
