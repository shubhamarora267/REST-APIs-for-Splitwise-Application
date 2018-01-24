const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const JWTAuthMiddleware = require('./auth/jwt.js');
const connection=require('./helpers/mysql.js');
connection.createConnection();

// Global variable acceesable throughout the application
global.async = require('async');
global.moment = require('moment');
global.responseObj = require('./helpers/response');
global.envConfig = require('config');
global.sqlpool=connection;

const port=global.envConfig.port || 3001;

//Set the static files location /public/
app.use(express.static(__dirname+"/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var allowCrossDomain=function(req,res,next){
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Methods','GET,PUT,POST');
	res.header('Access-Control-Allow-Headers','*');

	if(res.method==='OPTIONS'){
		res.send(200);
	}
	else{
		next(); // call the actual method to be called like GET/PUT/POST/DELETE
	}
}
app.use(allowCrossDomain);

app.all('/api/*', [JWTAuthMiddleware]);
require('./controllers/')(app);

app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).send('Something broke!')
});


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log('server is listening on '+port)
});
