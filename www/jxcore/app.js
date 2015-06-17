// This JavaScript file runs on JXcore

var fs = require('fs');
var clog = require('./utilities').log;
var express = require('express');
var app = express();
var PouchDB = require('pouchdb');

clog("JXcore is up and running!");

cordova('getBuffer').registerSync(function() {
  clog("getBuffer is called!!!");
  var buffer = new Buffer(25000);
  buffer.fill(45);

  // send back a buffer
  return buffer;
});

cordova('asyncPing').registerAsync(function(message, callback){
  setTimeout(function() {
    callback("Pong:" + message);
  }, 500);
});

var app = express();

var path= require('path');
var os = require('os');


var dbPath = path.join(os.tmpdir(),'dbPath');
var db = new PouchDB(dbPath);


db.get('123').then(function (doc) {
  console.log(doc);
}).catch(function (err) {
  console.log(err);
});
db.get('124').then(function (doc) {
  console.log(doc);
}).catch(function (err) {
  console.log(err);
});

db.put({
  _id: '124',
  author: 'Sreejumon',
  content: 'Test content'
}, function (err, doc) {
  console.log(doc);
});

db.put({
  _id: '123',
  author: 'Sreejumon',
  content: 'Test content'
}, function (err, doc) {
  console.log(doc);
});

db.allDocs({
  include_docs: true
  //attachments: true
}).then(function (result) {
  console.log(result);
}).catch(function (err) {
  console.log(err);
});


var server = app.listen(3000, function () {
  console.log("Express server started. (port: 3000)");
});


app.get('/', function (req, res) {
  res.send('Hello World! (' + Date.now() + ")");
  clog("Request", req.headers['x-forwarded-for'] || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress, new Date());
});


var os = require('os');
var net = os.networkInterfaces();

for (var ifc in net) {
  var addrs = net[ifc];
  for (var a in addrs) {
    if (addrs[a].family == "IPv4") {
      cordova('addIp').call(addrs[a].address);
    }
  }
}
