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


var CloudantUser, adminuser, callback, cloudantUser, newuser, server,
  slice = [].slice;

CloudantUser = require("cloudant-user");

function getVCAPCredentials() {
	
	if(process.env.VCAP_SERVICES) {
		var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
		// Pattern match to find the first instance of a Cloudant service in
		// VCAP_SERVICES. If you know your service key, you can access the
		// service credentials directly by using the vcapServices object.
		for(var vcapService in vcapServices){
			if(vcapService.match(/cloudant/i)){
				server.host = vcapServices[vcapService][0].credentials.host;
				server.port = vcapServices[vcapService][0].credentials.port;
				adminuser.name = vcapServices[vcapService][0].credentials.username;
				adminuser.pass = vcapServices[vcapService][0].credentials.password;
				
				break;
			}
		}
		if(dbCredentials==null){
			console.warn('Could not find Cloudant credentials in VCAP_SERVICES environment variable - data will be unavailable to the UI');
		}
	} else{
		console.warn('VCAP_SERVICES environment variable not set - data will be unavailable to the UI');
		// For running this app locally you can get your Cloudant credentials 
		// from Bluemix (VCAP_SERVICES in "cf env" output or the Environment 
		// Variables section for an app in the Bluemix console dashboard).
		// Alternately you could point to a local database here instead of a 
		// Bluemix service.
		//dbCredentials.host = "REPLACE ME";
		//dbCredentials.port = REPLACE ME;
		//dbCredentials.user = "REPLACE ME";
		//dbCredentials.password = "REPLACE ME";
		//dbCredentials.url = "REPLACE ME";
	}
}


callback = function(err, res) {
  if (err) {
    console.log(err);
  }
  if (res) {
    return console.log(res);
  }
};


app.post('/api/register', function(request, response) {
	
	newuser.name  = request.body.username;
	newuser.pass = request.body.password;
	newuser.roles = ["_reader", "_writer"]

	cloudantUser = new CloudantUser(server, adminuser);
	cloudantUser.create.apply(cloudantUser, [newuser.name, newuser.pass].concat(slice.call(newuser.roles), [callback]));

});





// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});