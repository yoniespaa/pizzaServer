const sql = require('mssql');
const { options } = require('./routes/controller');


var config = {
  server: "LENOVO",
  user: "sa", //default is sa
  password: "Qn7101234",
   // for local machine
  database: "CINE_FELIZ", // name of database
  port:1433,
  options: {
    encrypt: false
  }
}
var request;
//var conn =  new sql.ConnectionPool(config)
var conn = sql.connect(config, function (err) {
  if (err) {
    throw err;
  }
  this.request = new sql.Request();
  console.log('connection pool initialized')

});

exports.request = request;