const { DataTypes } = require("sequelize");

let loginDetailsModel = global.DB.define("login_details", {
  user_id: { type: DataTypes.STRING, primaryKey: true },
  user_email: { type: DataTypes.STRING, require: true },
  user_password: { type: DataTypes.STRING, require: true },
  user_type: { type: DataTypes.STRING, require: true },
  created_at: { type: DataTypes.DATE, require: false },
  updated_at: { type: DataTypes.DATE, require: false },
});

module.exports = loginDetailsModel;
