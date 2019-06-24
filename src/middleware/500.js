'use strict';

/**
 * @module 500_Server_Error
 */

/** 
 * @param {call-Back} err -error callback
 * @param {object} req - request Object
 * @param {object} res -response Object
 * @param {object} next -Middleware call
 * @desc Sends a 500 error when server goes ah-rye
*/
module.exports = (err, req, res, next) => {
  console.log('__SERVER_ERROR__', err);
  let error = { error: err.message || err };
  res.status(500).json(error);
};
