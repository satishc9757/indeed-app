const companyController = require('../controllers/companyController');
const { checkAuth } = require("../Utils/passport");
var express = require('express');
var router = express.Router();

router.get('/companyDetails', companyController.getCompanyDetailsByCompanyID);
router.post('/companyDetails', checkAuth, companyController.updateCompanyDetailsByCompanyID);
router.get('/getJobRole', companyController.getJobRoleDetailsByCompanyID);
router.get('/company', companyController.getCompanyDetailsByCompanyID);
router.get('/jobs', companyController.getJobsByCompanyId);
router.get('/jobsByPages', companyController.getJobsByCompanyIdWithPagination);
router.get('/getFeaturedReviews', companyController.getFeaturedReviewsByCompId);
router.post('/updateFeaturedReview', checkAuth, companyController.updateFeaturedReviewStatus);
router.get('/jobstats', companyController.getJobStatsByCompanyId);
router.get('/companies',companyController.getCompanies)
router.post('/profile', checkAuth, companyController.uploadCompanyProfilePicture)
router.get('/search', companyController.getCompaniesBySearchQuery);
router.get('/avgSalByDept', companyController.getAvgSalaryByDeptId);
router.post('/addSalaryReview', checkAuth, companyController.addSalaryReview)
router.get('/JobTitleByDept', companyController.getTitleByDepts);
router.post('/addEmployeeReview', checkAuth, companyController.addEmployeeReview);
router.get('/getReviewsByCompId', companyController.getReviewsByCompId)
router.post('/photos', checkAuth, companyController.uploadPhotos)
router.get('/photos',companyController.getPhotos)


module.exports = router;
