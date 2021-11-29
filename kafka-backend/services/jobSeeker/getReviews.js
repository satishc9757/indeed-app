const connection = require("../../database/mysqlConnection");

async function handle_request(msg, callback) {
  const companyId = msg.companyId;
  try {
    let sql = `SELECT * FROM company_reviews WHERE review_company_id='${companyId}';`;
    await connection.con.query(sql, (err, results) => {
      if (err) {
        callback(null, []);
      } else {
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
