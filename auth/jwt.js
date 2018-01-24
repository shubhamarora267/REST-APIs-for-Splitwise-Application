var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
  // Bypass auth create API from middleware
  if(req.url=="/api/auth/create"){
    next();
  }else{
    // If authorization exist
    if(req.headers['authorization']){
      var token=req.headers['authorization'];
      try{
        // If token is incorrect it will throw an exception
        var decoded = jwt.decode(token, global.envConfig.get('jwtAuthSecret'));

        // Check if token got expired
        if(decoded.exp <= Date.now()){
              res.send(global.responseObj.Error({},'Token got expired','AT024','200'));
        }else{
          req.userData=decoded;
          next();
        }
      }catch (err) {
        res.send(global.responseObj.Error({},'Invalid Access Token','AT024','200'));
      }
    }else{
      res.send(global.responseObj.Error({},'Auth Token missing in headers','AT024','200'));
    }
  }
};
