var response={
    Success:function(obj,result,resultCode){
        obj.result=result;
        obj.resultCode=resultCode;
        return obj;
    },
    Error:function(obj,errorMessage,errorCode,responseCode){
        obj.errorMessage=errorMessage;
        obj.errorCode=errorCode;
        obj.responseCode=responseCode;
        return obj;
    },
    Test:function(){
        return 'test is sucess';
    }
};
module.exports = response;
