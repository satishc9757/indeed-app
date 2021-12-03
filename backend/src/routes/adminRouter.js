const adminController = require('../controllers/adminController');
const { checkAuth } = require("../Utils/passport");
var express = require('express');
var router = express.Router();

router.get('/markReviewAsInappropriate', checkAuth, adminController.markReviewAsInappropriate); 
router.get('/markReviewAsAppropriate',checkAuth, adminController.markReviewAsAppropriate); 
router.get('/getAllCompanies',checkAuth, adminController.getAllCompanies);
router.get('/getAllReviews',checkAuth, adminController.getAllReviews);
router.get('/getNumberOfReviewsPerDay',checkAuth, adminController.getNumberOfReviewsPerDay);
router.get('/getTopFiveMostReviewedCompanies',checkAuth, adminController.getTopFiveMostReviewedCompanies);
router.get('/getTopFiveCompaniesAvgRating',checkAuth, adminController.getTopFiveCompaniesAvgRating);
router.get('/getTopFiveSeekersAccpReviews', checkAuth, adminController.getTopFiveSeekersAccpReviews);
router.get('/getTopTenCEORating', checkAuth,adminController.getTopTenCEORating);
router.get('/markPhotoAsInappropriate', adminController.markPhotoAsInappropriate); 
router.get('/markPhotoAsAppropriate', adminController.markPhotoAsAppropriate); 
router.get('/getAllPhotos', adminController.getAllPhotos);

module.exports = router;