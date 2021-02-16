const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const productRoutes = require('./routes/product');

const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('db connected'))
  .catch(error => console.log('--------error:', error));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/product', productRoutes);

module.exports = app;
