const companyController = require('../controllers/companyController');

var express = require('express');
var router = express.Router();

router.get('/companyDetails', companyController.getCompanyDetailsByCompanyID);
router.get('/getJobRole', companyController.getJobRoleDetailsByCompanyID);
router.get('/company', companyController.getCompanyDetailsByCompanyID);
router.get('/jobs', companyController.getJobsByCompanyId);
router.get('/getFeaturedReviews', companyController.getFeaturedReviewsByCompId);
router.post('/updateFeaturedReview', companyController.updateFeaturedReviewStatus);
router.get('/jobstats', companyController.getJobStatsByCompanyId);
router.get('/search', companyController.getCompaniesBySearchQuery);
router.get('/avgSalByDept', companyController.getAvgSalaryByDeptId);
router.post('/addSalaryReview',companyController.addSalaryReview)
router.get('/JobTitleByDept', companyController.getTitleByDepts);
module.exports = router;