'use strict';
const {server} = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('Bearer-OAuth', () => {

  it('given a good token user is able to “log in”', () => {
    

  });
  it('Tokens can optionally be expired', () => {

  });
  it('Expired tokens do not allow a user to login', () => {

  });

});