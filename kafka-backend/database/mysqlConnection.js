const { Promise } = require("mongoose");
const { Sequelize } = require("sequelize");
var mysql = require("sequelize");
const { prependListener } = require("../models/JobPostingsModel");

const initDBConnection = async () => {
  global.DB = new Sequelize("indeed", "admin", "admin123", {
    host: "indeed-db.c9uvql1ff7ga.us-east-2.rds.amazonaws.com",
    dialect: "mysql",
    logging: console.log,
  });

  return global.DB.authenticate()
    .then(() => {
      console.log("Connected to MYSQL the database");
      return Promise.resolve(global.DB);
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
};

const mysqllib = require("mysql"); 
const con = mysqllib.createConnection({
  host: "indeed-db.c9uvql1ff7ga.us-east-2.rds.amazonaws.com",
  user:"admin",
  password:"admin123",
  database:"indeed"
})

module.exports = {
  initDBConnection,
  con,
};


