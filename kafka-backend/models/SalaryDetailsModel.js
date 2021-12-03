const { DataTypes } = require("sequelize");

let salaryReviewsModel = global.DB.define("salary_reviews", {
  salary_id: { type: DataTypes.INTEGER, primaryKey: true },
  salary_user_id: { type: DataTypes.STRING, require: true },
  salary_company_id: { type: DataTypes.STRING, require: true },
  salary_is_working: { type: DataTypes.BOOLEAN, require: false },
  salary_end_date: { type: DataTypes.DATE, require: true },
  salary_job_title: { type: DataTypes.STRING, require: true },
  salary_job_location: { type: DataTypes.STRING, require: true },
  salary_pay: { type: DataTypes.FLOAT, require: true  },
  salary_workex:{ type: DataTypes.FLOAT, require: true  },
  salary_paid_timeoff: { type: DataTypes.BOOLEAN, require: false },
  salary_health_insurance: { type: DataTypes.BOOLEAN, require: false },
  salary_retirement: { type: DataTypes.BOOLEAN, require: false },
  salary_other_benifits: { type: DataTypes.BOOLEAN, require: false }

});

module.exports = salaryReviewsModel;
