'use strict';

const bearerAuth = require('../src/auth/middleware/bearer.js');
const router = require('./auth/router.js');
const permissions = require('./auth/middleware/authorize.js');

router.get('/secret',bearerAuth,bearerHandler);
router.get('/read',bearerAuth,permissions('read'),readHandler);
router.post('/add',bearerAuth,permissions('create'),addHandler);
router.put('/change',bearerAuth,permissions('update'),putHandler);
router.delete('/remove',bearerAuth,permissions('delete'),deleteHandler);

function bearerHandler(req,res){
    res.json(req.user);
};

function readHandler(req , res){
    res.send('Read Route OK !!');
}

function addHandler(req,res){
    res.send('Add Rout OK !!');
}

function putHandler(req,res){
    res.send('Change Rout OK !!');
}

function deleteHandler(req,res){
    res.send('Delete Rout OK !!');
}



module.exports = router ; 