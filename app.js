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
var Cloudant = require('cloudant');

var cloudantService = appEnv.getService("konnektr-cloudant");

var cloudanturl = cloudantService.credentials.url;
var cloudantuser = cloudantService.credentials.username;

// var cloudanturl = "https://9e901ac1-1c1c-4046-9c38-d4fbed11844c-bluemix:9ebeec7f0e6c66d40994b2ee85ea5ad724cac2558686cc6c4c161e33d6a7cad9@9e901ac1-1c1c-4046-9c38-d4fbed11844c-bluemix.cloudant.com";

var cloudant = Cloudant(cloudanturl);
var userdb = cloudant.db.use('_users');
var replicatordb = cloudant.db.use('_replicator');


function generatePasswordHash(password){
  var salt = crypto.randomBytes(16).toString('hex');
  var hash = crypto.createHash('sha1');
  hash.update(password + salt);
  return [hash.digest('hex'), salt];
}




app.post('/api/register', function(req, res) {
	var username = req.body.username;
  var password = req.body.password;	
  var userdocid = "org.couchdb.user:"+ username;
  var hashAndSalt = generatePasswordHash(password);
  userdb
  	.insert({
      	_id: userdocid,
        name: username,      	
      	password_sha: hashAndSalt[0],
        salt: hashAndSalt[1],
				roles: ["_reader", "_writer"],
        type: 'user',
        defaultdatabase: '',
        databases: []
      })
		.pipe(res);
});


app.post('/api/createdb', function(req, res) {
	var newdbname = req.body.dbname;
	cloudant.db
		.create(newdbname, 
      function (err, body) {
      	console.log(body);
      })	.pipe(res);
});

app.post('/api/replicatedb', function(req, res) {
	var dbname = req.body.dbname;
	var repsource = cloudanturl + '/setup';
	var reptarget = cloudanturl + '/' + dbname;
	replicatordb
  	.insert({
      	_id: dbname,    	
				source: repsource,
				target: reptarget,
				continuous: true
      }, 
      function (err, body) {
      	console.log(body);
      }).pipe(res);
});


app.post('/api/dbuseraccess', function(req, res) {
	var dbname = req.body.dbname;
	var username = req.body.username;	
//	var db = cloudant.db.use(dbname);	
  var path = "_api/v2/db/" + encodeURIComponent(dbname) + "/_security";
  cloudant.request({
  	path: path,
    method: "put",
    body: {
			couchdb_auth_only: true,
			admins: {
		  	names: [cloudantuser],
		  	roles:["_admin"]
		  },
			members: {
				names: [username],
				roles:[]
			}
		}},
		function (err, body) {
			console.log(err);
			console.log(body);
		}).pipe(res)	;	
});










app.post('/api/setupdb', function(req, res) {
	var dbname = req.body.dbname;
	var username = req.body.username;
	var repsource = cloudanturl + '/setup';
	var reptarget = cloudanturl + '/' + dbname;

	// create DB	
	cloudant.db
		.create(dbname, 
			// configure replication	
			function (err, body) {
				console.log('create: ',body);
				if (err) {res.sendStatus(err.statusCode);}
				else {		
					replicatordb
				  	.insert({
				      	_id: dbname,    	
								source: repsource,
								target: reptarget
				      }, 
				      // add user to DB's security document
				      function (err, body) {
				      	console.log('replicate: ',body);
				      	if (err) {res.sendStatus(err.statusCode);}
				      	else {	
									var newdb = cloudant.db.use(dbname);										
								  newdb
								  	.insert(	{
											  couchdb_auth_only: true,
											  admins: {
											  	names: [cloudantuser],
											  	roles:["_admin"]
											  },
											  members: {
											    names: [username],
											    roles:[]
											  }
											}, "_security", 
											function (err, body) {
												console.log('security: ',body);
												if (err) {res.sendStatus(err.statusCode);}
												else {res.sendStatus(200);}
											});
									}
							});
			  }
			});
});










/**
function (err, body) {
	console.log(body);
	if (!err) {
		// add database to user's database list
		console.log(body);
		userdb
			.get(userdocid, { revs_info: true }, 
				function (err, userdoc) {
					console.log(body);
				  if (!err) {
				  	console.log(body);
				  	var newuserdoc = userdoc;
				  	newuserdoc.databases.push(dbname);
				  	if (defaultdb) newuserdoc.defaultdatabase = dbname;
				  	userdb
				  		.insert(newuserdoc)
														  	
				  }
				});
	}
**/




// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});