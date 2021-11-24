const companyController = require('../controllers/companyController');

var express = require('express');
var router = express.Router();

router.get('/companyDetails', companyController.getCompanyDetailsByCompanyID);
router.get('/getJobRole', companyController.getJobRoleDetailsByCompanyID);

module.exports = router;