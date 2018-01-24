var jwt = require('jwt-simple');
class Auth{
    // To check whether the user is valid or not
    checkIfValidUser(email,password,callback){
        global.sqlpool.query('select id from users where email=? AND password=?',[email,password],function(error,result){
          if(error){
            return callback(error);
          }
          if(result.length <= 0){
              return callback('Invalid Username or password');
          }else{
              callback(null,result);
          }
        });
    }
    // Generate Token using JWT -expiry 30 days
    generateAuthToken(user,callback){
        var payload={
           id:user.id,
           exp:global.moment().add(30,'d').valueOf()
         };
         var token = jwt.encode(payload, global.envConfig.get('jwtAuthSecret'));
         callback(null,{'token':token});
    }
}
module.exports=new Auth();
