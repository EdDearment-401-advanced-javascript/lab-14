'use strict';

const User = require('./users-model.js');
/**
 * @module middleware
 * @param capability -User capability
 */

module.exports = capability => {
  
  return (req, res, next) => {

    try {
      let [authType, authString] = req.headers.authorization.split(/\s+/);

      switch (authType.toLowerCase()) {
      case 'basic':
        return _authBasic(authString);
      case 'bearer':
        return _authBearer(authString);
      default:
        return _authError();
      }
    } catch (e) {
      _authError();
    }

    /**     *
     * @method _authBasic
     * @param {Object} str -string
     * @desc -Handles Basic User signin information
     * @returns -An authenticated user
     */

    function _authBasic(str) {
    // str: am9objpqb2hubnk=
      let base64Buffer = Buffer.from(str, 'base64'); // <Buffer 01 02 ...>
      let bufferString = base64Buffer.toString();    // john:mysecret
      let [username, password] = bufferString.split(':'); // john='john'; mysecret='mysecret']
      let auth = {username, password}; // { username:'john', password:'mysecret' }

      return User.authenticateBasic(auth)
        .then(user => _authenticate(user))
        .catch(_authError);
    }

    /**
     *
     * @method _authBearer
     * @param {Object} authString -User credentials
     * @desc -Handles Bearer User singin information
     * @returns -An authenticated user string
     */
    function _authBearer(authString) {
      return User.authenticateToken(authString)
        .then(user => _authenticate(user))
        .catch(_authError);
    }
    
    /**
    *
    * @method _authenticate
    * @param {*} user
    * @desc -Authenticates the User based on capabilities
    */
    function _authenticate(user) {
      if ( user && (!capability || (user.can(capability))) ) { //If user is true they can veiw 
        req.user = user;
        req.token = user.generateToken();
        next();
      }
      else {
        _authError();
      }
    }
    /**
     * @method _authError
     * @desc -Handles signin errors
     */
    function _authError() {
      next('Invalid User ID/Password');
    }

  };
  
};