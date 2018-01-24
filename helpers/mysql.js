var mysql=require('mysql');
module.exports={
  pool:'',
  createConnection:function(){
    if(!this.pool){
      this.pool= mysql.createPool({
        connectionLimit : 10,
        host            : 'localhost',
        user            : 'node',
        password        : '123',
        database        : 'splitwise'
      });
    }
    return this.pool;
  },

  query:function(query,arr,callback){
    this.pool.query(query, arr,function (error, results, fields) {
      if(error){
        callback(error);
      }
      callback(null,results);
    });
  }
};
