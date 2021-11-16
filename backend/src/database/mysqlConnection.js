var mysql = require('mysql');

var con = mysql.createConnection({
  host: "",
  user: "admin",
  password: "",
  database: ""
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

module.exports = con;