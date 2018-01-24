var express = require('express');
var router = express.Router();
var friendsModel = require('../models/Friends.js');

router.get('/', function(req, res, next) {
  if(req.userData.id){
    friendsModel.getFriends(req.userData.id,(err,friends)=>{
      if (err) {
          res.json(global.responseObj.Error({},err,'AT024','200'));
      }
      res.json(friends);
    });
  }else{
    res.send(global.responseObj.Error({},'Friend List Not Found','AT024','200'));
  }
});

module.exports = router;
