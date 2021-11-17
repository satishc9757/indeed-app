const { DataTypes } = require("sequelize");

let loginDetailsModel = global.DB.define("login_details", {
  user_id: { type: DataTypes.UUID, primaryKey: true },
  user_email: { type: DataTypes.STRING, require: true },
  user_password: { type: DataTypes.STRING, require: true },
  user_type: { type: DataTypes.STRING, require: true },
});

module.exports = loginDetailsModel;
