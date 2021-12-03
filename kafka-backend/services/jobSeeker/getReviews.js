const connection = require("../../database/mysqlConnection");

async function handle_request(msg, callback) {
  const jobSeekerId = msg.jobSeekerId;
  try {
    let sql = "SELECT * FROM company_reviews"
    await connection.con.query(sql, (err, results) => {
      if (err) {
        callback(null, []);
      } else {
        console.log("results ",results);
        callback(null, results);
      }
    });
  } catch (err) {
    console.log(err);
    callback(null, {
      response_code: 500,
      response_data: "Something went wrong!",
      err,
    });
  }
}

exports.handle_request = handle_request;
