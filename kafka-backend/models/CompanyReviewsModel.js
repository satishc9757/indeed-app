const { DataTypes } = require("sequelize");

let companyReviewModel = global.DB.define("company_reviews", {
  id: { type: DataTypes.UUID, primaryKey: true },
  reviewUserId: { type: DataTypes.STRING, require: true },
  reviewCompanyId: { type: DataTypes.STRING, require: true },
  reviewIsFeatured: { type: DataTypes.BOOLEAN, require: false },
  reviewCompanyRating: { type: DataTypes.INTEGER, require: false },
  reviewDate: { type: DataTypes.DATE, require: true },
  reviewTitle: { type: DataTypes.STRING, require: false },
  reviewContent: { type: DataTypes.STRING, require: false },
  reviewPros: { type: DataTypes.STRING, require: false },
  reviewCons: { type: DataTypes.STRING, require: false },
  ceoRating: { type: DataTypes.INTEGER, require: false },
  reviewPrep: { type: DataTypes.STRING, require: false },
  foundHelpul: { type: DataTypes.INTEGER, require: false },
  foundNotHelpul: { type: DataTypes.INTEGER, require: false },
});

module.exports = companyReviewModel;
