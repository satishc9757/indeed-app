const companyController = require('../controllers/companyController');
const { checkAuth } = require("../Utils/passport");
var express = require('express');
var router = express.Router();

router.get('/companyDetails', checkAuth, companyController.getCompanyDetailsByCompanyID);
router.post('/companyDetails', checkAuth, companyController.updateCompanyDetailsByCompanyID);
router.get('/getJobRole', checkAuth, companyController.getJobRoleDetailsByCompanyID);
router.get('/company', checkAuth, companyController.getCompanyDetailsByCompanyID);
router.get('/jobs', checkAuth,  companyController.getJobsByCompanyId);
router.get('/jobsByPages', checkAuth, companyController.getJobsByCompanyIdWithPagination);
router.get('/getFeaturedReviews', checkAuth, companyController.getFeaturedReviewsByCompId);
router.post('/updateFeaturedReview', checkAuth, companyController.updateFeaturedReviewStatus);
router.get('/jobstats', checkAuth, companyController.getJobStatsByCompanyId);
router.get('/companies', checkAuth, companyController.getCompanies)
router.post('/profile', checkAuth, companyController.uploadCompanyProfilePicture)
router.get('/search', checkAuth, companyController.getCompaniesBySearchQuery);
router.get('/avgSalByDept', checkAuth, companyController.getAvgSalaryByDeptId);
router.post('/addSalaryReview', checkAuth, companyController.addSalaryReview)
router.get('/JobTitleByDept', checkAuth, companyController.getTitleByDepts);
router.post('/addEmployeeReview', checkAuth, companyController.addEmployeeReview);
router.get('/getReviewsByCompId', checkAuth, companyController.getReviewsByCompId)
module.exports = router;