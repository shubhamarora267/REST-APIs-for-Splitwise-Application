var express = require('express');
var router = express.Router();
var authModel = require('../models/Auth');


router.post('/create', function(req, res, next) {
  // Authenticating user and create a access token if valid
  global.async.waterfall([
    // Check if the user is valid
    function(callback){
      authModel.checkIfValidUser(req.body.email,req.body.password,(err,user)=>{
        if (err) {
            return callback(err);
        }
        callback(null, user[0]);
      });
    },
    // Generate Auth Token Using JWT
    function(userData,callback){
      authModel.generateAuthToken(userData,(err,tokenString)=>{
        if(err){
          return callback(err);
        }else{
          callback(null, tokenString);
        }
      });
    }
  ],function(err,result){
    if(err){
      res.json(global.responseObj.Error({},err,'AT024','200'));
    }else{
      res.json(result);
    }
  });  
});
module.exports = router;
