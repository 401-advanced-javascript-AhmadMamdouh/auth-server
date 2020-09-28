'use strict';

const express = require('express');
const UserModelIns = require('../auth/models/users-model.js');
const bassicAuth = require('./middleware/basic.js');
const oauth = require('./middleware/oauth.js');

const router = express.Router();


router.post('/signup', signUpHandler);
router.post('/signin' , bassicAuth , signInHandler);
router.get('/users',usersHandler);
router.get('/oauth', oauth, oauthHandler);


function signUpHandler(req, res){
  console.log(req.body);
  UserModelIns.save(req.body).then((data) => {
    const token = UserModelIns.generateToken(data);
    console.log({token});
    res.json({token});        
  }).catch(err => res.status(403).send(err));
}

  
function signInHandler(req, res){
  return res.json({token:req.token, user: req.username});  
}


function usersHandler(req, res){
  return UserModelIns.get().then((list)=> {
    return res.json(list);
  });
}

function oauthHandler(req, res){
  res.json({ token: req.token });
}

module.exports = router;