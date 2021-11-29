const { DataTypes } = require("sequelize");

let companyReviewModel = global.DB.define("company_reviews", {
  review_id: { type: DataTypes.INTEGER, primaryKey: true },
  review_user_id: { type: DataTypes.INTEGER, require: true },
  review_company_id: { type: DataTypes.INTEGER, require: true },
  review_is_featured: { type: DataTypes.BOOLEAN, require: false },
  review_company_rating: { type: DataTypes.FLOAT, require: false },
  review_date: { type: DataTypes.DATE, require: true },
  review_title: { type: DataTypes.STRING, require: false },
  review_content: { type: DataTypes.STRING, require: false },
  review_pros: { type: DataTypes.STRING, require: false },
  review_cons: { type: DataTypes.STRING, require: false },
  ceo_rating: { type: DataTypes.FLOAT, require: false },
  review_prep: { type: DataTypes.STRING, require: false },
  found_helpful: { type: DataTypes.INTEGER, require: false },
  found_not_helpful: { type: DataTypes.INTEGER, require: false },
  inappropriate: { type: DataTypes.INTEGER, require: false },
  created_at: { type: DataTypes.DATE, require: false },
  updated_at: { type: DataTypes.DATE, require: false },
});

module.exports = companyReviewModel;
