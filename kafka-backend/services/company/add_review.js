const connection = require("../../database/mysqlConnection");
const companyReview = require("../../models/CompanyReviewsModel");

async function handle_request(msg, callback) {
  try {
    const date = Date.now();

    let sql =`insert into company_reviews(created_at, updated_at,    review_user_id,    review_company_id, review_is_featured, review_company_rating, review_date, review_title, review_content, review_pros, review_cons,review_prep, found_helpful, found_not_helpful, inappropriate,review_city,review_state) 
    values(
    now(),
    now(),
    ${msg.userid},
    ${msg.companyid},
    false,
    ${msg.rating},
    now(),
    "${msg.title}",
    "${msg.summary}",
    "${msg.pros}",
    "${msg.cons}",
    "${msg.prep}",
    0,
    0,
    -1,
    "${msg.city}",
    "${msg.state}"
    );`;

    await connection.con.query(sql, (err, results) => {
      if (err) {
        callback(null, []);
      } else {
        callback(null, "Added Successfully!");
      }
    });
    callback(null, { message: "Review Added" });
  } catch (err) {
    console.log(err);
    callback({ isError: true, error: err, status: 500 }, null);
  }
}

exports.handle_request = handle_request;
