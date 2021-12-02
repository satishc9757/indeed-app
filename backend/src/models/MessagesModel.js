const { DataTypes } = require("sequelize");

let messagesModel = global.DB.define("messages", {
  msg_id: { type: DataTypes.INTEGER, primaryKey: true },
  msg_content: { type: DataTypes.STRING, require: true },
  msg_sender: { type: DataTypes.STRING, require: true },
  msg_receiver: { type: DataTypes.STRING, require: true },
  msg_sender_type: { type: DataTypes.STRING, require: true },
  msg_receiver_type: { type: DataTypes.STRING, require: true },
  msg_created_on: { type: DataTypes.DATE, require: true },
  created_at: { type: DataTypes.DATE, require: false },
  updated_at: { type: DataTypes.DATE, require: false },
  msg_sender_name: { type: DataTypes.STRING, require: true },
  msg_receiver_name: { type: DataTypes.STRING, require: true },
});

module.exports = messagesModel;
