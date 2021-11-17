const Reviews = require("../../models/CompanyReviewsModel");

async function handle_request(msg, callback) {
  const compId = msg.cmpId;
  console.log("message",msg)
  //console.log("Inside getRes using mongo id"+resId);
console.log(Reviews);
  try {
    let reviews = await Reviews.findAll({ where: { reviewCompanyId: compId } });
    callback(null, reviews);
  } catch (err) {
    console.log(err);
    callback({ isError: true, error: err, status: 500 }, null);
  }
}

exports.handle_request = handle_request;
