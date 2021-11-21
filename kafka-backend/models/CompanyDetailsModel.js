const { DataTypes } = require('sequelize');

let companyDetailsModel = global.DB.define('company_details', {
  comp_id: { type: DataTypes.STRING, primaryKey: true },
  comp_name: { type: DataTypes.STRING, require: true },
  comp_size: { type: DataTypes.STRING, require: true },
  comp_type: { type: DataTypes.STRING, require: true },
  comp_website: { type: DataTypes.STRING, require: false },
  comp_revenue: { type: DataTypes.INTEGER, require: true },
  comp_headquarters: { type: DataTypes.STRING, require: false },
  comp_founded: { type: DataTypes.STRING, require: false },
  comp_mission: { type: DataTypes.STRING, require: false },
  comp_ceo: { type: DataTypes.STRING, require: true },
  comp_about: { type: DataTypes.STRING, require: true },
  comp_work_culture: { type: DataTypes.STRING, require: false },
  comp_value: { type: DataTypes.STRING, require: false },
  comp_description: { type: DataTypes.STRING, require: true },
  comp_work_happiness: { type: DataTypes.FLOAT, require: false },
  comp_learning: { type: DataTypes.FLOAT, require: false },
  comp_appreciation: { type: DataTypes.FLOAT, require: false },
  created_at: { type: DataTypes.DATE, require: false },
  updated_at: { type: DataTypes.DATE, require: false },
});

module.exports = companyDetailsModel;
