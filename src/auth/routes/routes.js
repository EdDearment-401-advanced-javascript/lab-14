'use strict';

const express = require('express');
const auth = require('../middleware.js');

const newRouter = express.Router();

newRouter.get('/public-stuff', (req, res, next) => {
  res.status(200).send('Message for you sir!');
});

newRouter.get('/hidden-stuff', auth(), (req, res, next) => {
  res.status(200).send('This parrot is dead!');
});

newRouter.get('/something-to-read', auth('read'), (req, res, next) => {
  res.send(200).send('No one expects the inquestion');
});

newRouter.post('/create-a-thing', auth('create'), (req, res, next) => {
  res.send(200).send('Now for somthing completly differnt');
});

newRouter.put('/update', auth('update'), (req, res, next) => {
  res.status(200).send('We are the knights that say Ni')
});

newRouter.patch('/jp', auth(),  (req, res, next) => {
  res.status(200).send('Alright then this is too silly.')
});

newRouter.delete('/bye-bye', auth(), (req, res, next) => {
  res.status(200).send('Tis but a flesh wound')
});

newRouter.get('/everything', auth('superuser'), (req, res, next) => {
  res.status(200).send('I spy with my little eye somthing...')
});

module.exports = newRouter;