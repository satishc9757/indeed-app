const mongoose = require("mongoose");
const schema = mongoose.Schema;

let companyReviewsSchema = new mongoose.Schema({
  reviewUserId: { type: schema.ObjectId, required: true },
  reviewCompanyId: { type: schema.ObjectId, required: true },
  reviewIsFeatured: { type: Boolean, required: false },
  reviewCompanyRating: { type: Number, required: false },
  reviewDate: { type: Date, required: true },
  reviewTitle: { type: String, required: false },
  reviewContent: { type: String, required: false },
  reviewPros: { type: String, required: false },
  reviewCons: { type: String, required: false },
  ceoRating: { type: Number, required: false },
  reviewPrep: { type: String, required: false },
  foundHelpul: { type: Number, required: false },
  foundNotHelpul: { type: Number, required: false },
});

const companyReviewModel = mongoose.model(
  "companyReviews",
  companyReviewsSchema
);
module.exports = companyReviewModel;
