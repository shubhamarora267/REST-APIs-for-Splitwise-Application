class Friends{
    getFriends(userId,callback){
        const query="SELECT u.id,u.name FROM (SELECT DISTINCT(map2.user_id) FROM `user_group_mapping` map1 INNER JOIN user_group_mapping AS map2 ON map1.group_id=map2.group_id AND map1.user_id!=map2.user_id WHERE map1.user_id='"+userId+"') AS tbl INNER JOIN `users` AS u ON tbl.user_id=u.id ";
        global.sqlpool.query(query,[],function(error,result){
          if(error){
            return callback(error);
          }

          callback(null,result);
        });
    }    
}
module.exports=new Friends();
