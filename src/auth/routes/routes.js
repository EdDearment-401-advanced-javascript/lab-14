'use strict';

const express = require('express');
const User = require('./users-model.js');
const auth = require('./middleware.js');
const oauth = require('./oauth/google.js');

const newRouter = express.Router();

newRouter.get('/public-stuff', (req, res, next) => {
  res.status(200).send('Message for you sir!');
});

newRouter.get('/hidden-stuff', auth(), (req, res, next) => {
  res.status(200).send('This parrot is dead!');
});

// newRouter.get('', auth(), (req, res, next) => {
//   res.send(200).send('No one expects the inquestion');
// })