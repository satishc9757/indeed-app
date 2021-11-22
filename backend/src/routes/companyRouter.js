const companyController = require('../controllers/companyController');

var express = require('express');
var router = express.Router();

route.get('/company', companyController.getCompanyDetailsByCompanyID);
route.get('/getJobRole', companyController);

module.exports = router;