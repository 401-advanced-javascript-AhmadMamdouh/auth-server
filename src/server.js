'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const notFound = require('../src/middleware/404.js');
const serverError = require('../src/middleware/500.js');
const router = require('./auth/router.js');
const extraRouts = require('./extra-routes.js');

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(extraRouts);
app.use('*',notFound);
app.use(serverError);


module.exports = {
  server : app,
  start : port =>{
    const PORT = port || process.env.PORT || 4000 ;
    app.listen(PORT,()=> console.log(`SERVER UP & Running on PORT : ${PORT}`));
  },
};