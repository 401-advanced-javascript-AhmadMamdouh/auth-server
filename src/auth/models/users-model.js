'use strict';
require('dotenv').config();
const userSchema = require('./user.schema.js');
const Model = require('./mongo.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'mysecret';


class UserModel extends Model {
  constructor() {
    super(userSchema);
  }
  save(record) {
    return this.get({ username: record.username }).then((result) => {
      if (result.length === 0) {
        return bcrypt.hash(record.password, 5).then((hash) => {
          record.password = hash;
        }).then(() => {
          return this.create(record).then((created) => {
            return created;
          });
        });
      } else {
        console.log('username already exists');
      }
    });
  }
  authenticateBasic(user, pass) {
    console.log('before', { username: user });
    return this.get({ username: user }).then((result) => {
      return bcrypt.compare(pass, result[0].password).then((valid) => {
        return valid ? result : Promise.reject('wrong password');
      });
    });
  }
  generateToken(user) {
    const token = jwt.sign({ username: user.username }, SECRET);
    return token;
  }

  authenticateToken(token) {
    try {

      const tokenObject = jwt.verify(token, SECRET);
      console.log('tokenObject ====>',tokenObject);

      return this.get({  iat: tokenObject.id }).then((result) => {
        if (result.length === 0) {
          console.log('User Id dose not exist');
          return Promise.reject('User ID is not Found!!!');
        } else {
          console.log('User ID Already Exists', tokenObject);
          return Promise.resolve(result[0]);
        }
      });
    } catch (e) {
      return Promise.reject();
    }
  }
}

module.exports = new UserModel(userSchema);