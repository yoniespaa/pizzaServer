const mysql = require('mysql');

var mysqlConnection = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'DW'
});
mysqlConnection.getConnection(function (err, connection) {
  if (err) {
    return cb(err);
  }
  console.log('connection pool initialized')

});
exports.mysqlConnection = mysqlConnection;