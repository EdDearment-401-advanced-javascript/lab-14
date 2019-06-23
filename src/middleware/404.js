'use strict';

/**
 * @module 404_Error
 */

 /**
  * @param {object} req Request from User
  * @param {object} res Response for User
  * @param {object} next middleware call
  * @desc Resource not found: Maybe the page Does Not Exist
  */

module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.status(404).json(error);
};
