'use strict';

const mongoose = require('mongoose');
const roles = require('./roles.schema.js');

const user = mongoose.Schema({
  username: { type: String, required: true},
  password: {type: String, required: true},
  role:{
    type :String,
    default : 'user',
    enum : ['user','writer','editor','admin']
  },
},
{toObject:{virtuals:true}, toJSON:{virtuals:true}});

user.virtual('acl', {
  ref:'roles',
  localField:'role',
  foreignField: 'role',
  justOne: true,
});

module.exports = mongoose.model('users', user);