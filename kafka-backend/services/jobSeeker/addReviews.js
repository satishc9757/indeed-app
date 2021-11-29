const connection = require("../../database/mysqlConnection");
const companyReview = require("../../models/CompanyReviewsModel");

async function handle_request(msg, callback) {
  try {
    const date = Date.now();

    let sql =
      "INSERT INTO `company_reviews` (`review_id`, `review_user_id`, `review_company_id`, `review_is_featured`,  `review_company_rating`,`review_date`, `review_title`, `review_content`, `review_pros`, `review_cons`, `ceo_rating`, `review_prep`, `found_helpful`, `found_not_helpful`, `inappropriate`, `created_at`, `updated_at`)";
    sql += ` VALUES ('${msg.review_id ? msg.review_id : null}', '${
      msg.review_user_id ? msg.review_user_id : null
    }', '${msg.review_company_id ? msg.review_company_id : null}', '${
      msg.review_is_featured ? msg.review_is_featured : null
    }', '${msg.review_company_rating ? msg.review_company_rating : null}', '${
      msg.review_date ? msg.review_date : null
    }','${msg.review_title ? msg.review_title : null}','${
      msg.review_content ? msg.review_content : null
    }','${msg.review_pros ? msg.review_pros : null}','${
      msg.review_cons ? msg.review_cons : null
    }','${msg.ceo_rating ? msg.ceo_rating : null}','${
      msg.review_prep ? msg.review_prep : null
    }','${msg.found_helpful ? msg.found_helpful : null}','${
      msg.found_not_helpful ? msg.found_not_helpful : null
    }','${msg.inappropriate ? msg.inappropriate : null}','${date}','${date}');`;

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
