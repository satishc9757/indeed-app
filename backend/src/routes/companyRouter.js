const companyController = require('../controllers/companyController');
const { checkAuth } = require("../Utils/passport");
var express = require('express');
var router = express.Router();

router.get('/companyDetails', companyController.getCompanyDetailsByCompanyID);
router.post('/companyDetails', companyController.updateCompanyDetailsByCompanyID);
router.get('/getJobRole', companyController.getJobRoleDetailsByCompanyID);
router.get('/company', companyController.getCompanyDetailsByCompanyID);
router.get('/jobs', companyController.getJobsByCompanyId);
router.get('/jobsByPages', companyController.getJobsByCompanyIdWithPagination);
router.get('/getFeaturedReviews', companyController.getFeaturedReviewsByCompId);
router.post('/updateFeaturedReview', companyController.updateFeaturedReviewStatus);
router.get('/jobstats', companyController.getJobStatsByCompanyId);
router.get('/companies',companyController.getCompanies)
router.post('/profile', companyController.uploadCompanyProfilePicture)
router.get('/search', companyController.getCompaniesBySearchQuery);
router.get('/avgSalByDept', companyController.getAvgSalaryByDeptId);
router.post('/addSalaryReview',companyController.addSalaryReview)
router.get('/JobTitleByDept', companyController.getTitleByDepts);
router.post('/addEmployeeReview',companyController.addEmployeeReview);
router.get('/getReviewsByCompId', companyController.getReviewsByCompId)
router.post('/photos',companyController.uploadPhotos)
router.get('/photos',companyController.getPhotos)


module.exports = router;
