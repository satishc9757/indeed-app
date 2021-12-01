const { DataTypes } = require("sequelize");

let messagesModel = global.DB.define("messages", {
  msg_id: { type: DataTypes.INTEGER, primaryKey: true },
  msg_content: { type: DataTypes.STRING, require: true },
  msg_sender: { type: DataTypes.INTEGER, require: true },
  msg_receiver: { type: DataTypes.INTEGER, require: true },
  msg_sender_type: { type: DataTypes.STRING, require: true },
  msg_receiver_type: { type: DataTypes.STRING, require: true },
  msg_created_on: { type: DataTypes.DATE, require: true },
  created_at: { type: DataTypes.DATE, require: false },
  updated_at: { type: DataTypes.DATE, require: false },
});

module.exports = messagesModel;
