'user strict';
const usersModel = require('../models/users-model.js');

module.exports = (req, res, next) => {

  if (!req.headers.authorization) {
    next('Invalid Login no auth headers');
    return;
  } else {
    let [auth, token] = req.headers.authorization.split(' ');
    if (auth === 'Bearer') {
<<<<<<< HEAD
      console.log('TOKEN', token);
      users.authenticateToken(token).then((validUser) => {
        console.log('validUser ---->',validUser);
        req.user = validUser;
        next();
      })
        .catch((e) => next('Invalid login', e.message));
=======
      usersModel
        .authenticateToken(token)
        .then((validUser) => {
          req.user = {
            username: validUser[0].username,
            acl: validUser[0].acl,
            capabilities: validUser[0].acl.capabilities,
          };
          req.token = token;
          next();
        })
        .catch((e) => next('Invalid login'));
>>>>>>> 58266b3b67e5e42d968ae0258db426b6b5ce5f51
    } else {
      next('Invalid auth header');
    }
  }
};