/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// Body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// crypto
var crypto = require('crypto');

// Cloudant
var cradle = require('cradle');
var dbCredentials;


/**
function getVCAPcredentials() {
	
	if(process.env.VCAP_SERVICES) {
		var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
		// Pattern match to find the first instance of a Cloudant service in
		// VCAP_SERVICES. If you know your service key, you can access the
		// service credentials directly by using the vcapServices object.
		for(var vcapService in vcapServices){
			if(vcapService.match(/cloudant/i)){
				dbCredentials.host = vcapServices[vcapService][0].credentials.host;
				dbCredentials.port = vcapServices[vcapService][0].credentials.port;
				dbCredentials.user = vcapServices[vcapService][0].credentials.username;
				dbCredentials.password = vcapServices[vcapService][0].credentials.password;
				dbCredentials.url = vcapServices[vcapService][0].credentials.url;
					
				break;
			}
		}
	} else{
		console.warn('VCAP_SERVICES environment variable not set - data will be unavailable to the UI');
	}
};

getVCAPcredentials();
**/

cradle.setup({
  host: '7e0ec13a-1e6e-4efe-83ed-709d223d5e37-bluemix.cloudant.com',
  port: 443,
  cache: false,
  timeout: 5000
});

var conn = new (cradle.Connection)({
  secure: true,
  auth: {
  	username: '7e0ec13a-1e6e-4efe-83ed-709d223d5e37-bluemix', 
  	password: 'c9b6d1ba44f61a5b0e26f622aef1c025b7af555cb88e9c4be4f66e07f6471365' 
  	}
});

var userdb = conn.database('_users');

function createUser(username, password, callback){
  userdb.get(username, function (err, doc) {
    if(err && err.error === 'not_found'){
      var hashAndSalt = generatePasswordHash(password);
      userdb.save("org.couchdb.user:" + username, {
        name: username,
        password_sha: hashAndSalt[0],
        salt: hashAndSalt[1],
        password_scheme: 'simple',
        type: 'user'
      }, callback);
    } else if(err) {
      callback(err);
    } else {
      callback({error: 'user_exists'});
    }
  });
}

function generatePasswordHash(password){
  var salt = crypto.randomBytes(16).toString('hex');
  var hash = crypto.createHash('sha1');
  hash.update(password + salt);
  return [hash.digest('hex'), salt];
}





app.post('/api/register', function(req, res) {
		console.log(req);
    var username = req.body.username;
    var password = req.body.password;
    
    createUser(username, password);
    
});




// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});