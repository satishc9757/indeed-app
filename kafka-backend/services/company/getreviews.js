const Reviews = require("../../models/CompanyReviewsModel");

async function handle_request(msg, callback) {
  console.log('inside');
  const compId = msg.compId;
  console.log("message",msg)
  //console.log(Reviews);
  try {
    let reviews = await Reviews.findAll({ where: { review_company_Id: compId } });
    //console.log('reviews', reviews);
    callback(null, reviews);
  } catch (err) {
    console.log(err);
    callback({ isError: true, error: err, status: 500 }, null);
  }
}

exports.handle_request = handle_request;
