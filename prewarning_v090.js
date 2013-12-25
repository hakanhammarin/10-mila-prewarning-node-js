//prewarning.js
var splittimes = require("./splittimes.js");
var fs = require('fs');
var warnings = 'no warnings' ;
var listsize = 1;
var http = require('http').createServer(function handler(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
}).listen(3000);


  
var mysql = require('mysql');
var MYSQL_USERNAME = 'root';
var MYSQL_PASSWORD = 'root';
 
var client = mysql.createConnection({
  host: 'localhost',
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
});
client.query('USE test10mila2014');

var io = require('socket.io').listen(http);
io.sockets.on('connection', function(socket) {
  console.log('Client connected');
  socket.join('subscribe');
  
 });
 
setInterval(function() { console.log("SQL Query: every 10 second!"); 

var querystring = 'SELECT results.bibNumber as BibNumber, results.relayPersonOrder AS Leg, SUBSTR(passedTime,12,8) as Time ,controls.id as Control FROM splittimes INNER JOIN splittimecontrols ON splittimecontrols.splitTimeControlId=splittimes.splitTimeControlId INNER JOIN controls ON controls.controlId=splittimecontrols.timingControl INNER JOIN results ON splittimes.resultRaceIndividualNumber = results.resultId INNER JOIN entries ON entries.entryID = results.EntryId WHERE splittimes.modifyDate > "2013-05-04 10:38:28.820" AND controls.id = "200" ORDER BY splittimes.passedTime desc LIMIT '+(listsize)+',100;';
var querystringfinish = 'SELECT results.bibNumber as BibNumber, results.relayPersonOrder AS Leg, SUBSTR(passedTime,12,8) as Time ,controls.id as Control FROM splittimes INNER JOIN splittimecontrols ON splittimecontrols.splitTimeControlId=splittimes.splitTimeControlId INNER JOIN controls ON controls.controlId=splittimecontrols.timingControl INNER JOIN results ON splittimes.resultRaceIndividualNumber = results.resultId INNER JOIN entries ON entries.entryID = results.EntryId WHERE splittimes.modifyDate > "2013-05-04 10:38:28.820" AND controls.id = "200" ORDER BY splittimes.passedTime desc LIMIT '+(listsize+10)+',100;';
// var querystring = 'SELECT results.bibNumber as BibNumber, results.relayPersonOrder AS Leg, SUBSTR(passedTime,12,8) as Time ,controls.id as Control FROM splittimes INNER JOIN splittimecontrols ON splittimecontrols.splitTimeControlId=splittimes.splitTimeControlId INNER JOIN controls ON controls.controlId=splittimecontrols.timingControl INNER JOIN results ON splittimes.resultRaceIndividualNumber = results.resultId INNER JOIN entries ON entries.entryID = results.EntryId WHERE splittimes.modifyDate > "2013-05-04 10:38:28.820" AND controls.id = "200" ORDER BY splittimes.passedTime desc LIMIT 0,100;';
client.query(querystring, function(err, results, fields) {
	io.sockets.emit('prewarning', results); 
  });
//alter the teams list although the database is from the 2013 event 
 listsize += 1
  
  
  }, 10000);
  
 // splittimes.get_splittimes(function(times) {
   // console.log(times);
  // });
  
  // populate employees on client
  
    
 