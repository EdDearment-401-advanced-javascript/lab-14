'use strict';

const express = require('express');
const newRouter = express.Router();
const auth = require('../middleware.js');
const Role = require('../users-model');

const capabilities = {
  admin: ['create', 'read', 'update', 'delete', 'superuser'],
  editor: ['create', 'read', 'update'],
  user: ['read'],
};
/*
* @route POST /{role}
* @returns {Object} 200 
*/
newRouter.post('/role', (req, res) => {
  let saves = [];
  Object.keys(capabilities).map(role => {
    let newRecord = new Role({role, capabilities: capabilities[role]});
    saves.push(newRecord.save());
  });
  Promise.all(saves);
  res.status(200).send('Roles created');
});

/*
* @route GET /public-stuff
* @returns {Object} 200 
*/
newRouter.get('/public-stuff', (req, res, next) => {
  res.status(200).send('This parrot is dead!');
});

/*
* @route GET /hidden-stuff
* @returns {Object} 200 
*/
newRouter.get('/hidden-stuff', auth(), (req, res, next) => {
  res.status(200).send('No one expects the inquisition');
});

/*
* @route GET /something-to-read
* @returns {Object} 200 
*/
newRouter.get('/something-to-read', auth('read'), (req, res, next) => {
  res.send(200).send('Message for you sir!');
});

/*
* @route Post /create-a-thing
* @returns {Object} 200 
*/
newRouter.post('/create-a-thing', auth('create'), (req, res, next) => {
  res.send(200).send('Now for somthing completly differnt');
});

/*
* @route PUT /update
* @returns {Object} 200 
*/
newRouter.put('/update', auth('update'), (req, res, next) => {
  res.status(200).send('We are the knights that say Ni');
});

/*
* @route PATCH /jp
* @returns {Object} 200 
*/
newRouter.patch('/jp', auth(),  (req, res, next) => {
  res.status(200).send('Alright then this is too silly.');
});

/*
* @route DELETE /bye-bye
* @returns {Object} 200 
*/
newRouter.delete('/bye-bye', auth(), (req, res, next) => {
  res.status(200).send('Tis but a flesh wound');
});

/*
* @route GET /everything
* @returns {Object} 200 
*/
newRouter.get('/everything', auth('superuser'), (req, res, next) => {
  res.status(200).send('I spy with my little eye somthing...');
});

module.exports = newRouter;