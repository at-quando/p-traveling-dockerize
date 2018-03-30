/** @type {{issuer:string,secret:string,audience:string,alg:string,idTokenExp:number,accessTokenExp:number}} */
module.exports = {
  issuer: undefined, // must be loaded from env
  secret: undefined, // must be loaded from env
  audience: undefined, // must be loaded from env
  alg: 'HS256',
  idTokenExp: 60 * 60 * 5,
  accessTokenExp: 60 * 60
};
