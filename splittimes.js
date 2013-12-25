//functions read last prewarning


 
// function to get list of employees
exports.get_splittimes = function(callback) {
  client.query('SELECT * FROM splittimes where modifyDate > "2013-05-05 14:38:28.820" ORDER BY passedTime desc LIMIT 0,100;', function(err, results, fields) {
    // callback function returns splitimes array
    callback(results);
  });
}