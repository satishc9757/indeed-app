const adminController = require('../controllers/adminController');

var express = require('express');
var router = express.Router();

router.get('/markReviewAsInappropriate', adminController.markReviewAsInappropriate); //test later
router.get('/getAllCompanies', adminController.getAllCompanies);
router.get('/getAllReviews', adminController.getAllReviews);
router.get('/getNumberOfReviewsPerDay', adminController.getNumberOfReviewsPerDay);
router.get('/getTopFiveMostReviewedCompanies', adminController.getTopFiveMostReviewedCompanies);
router.get('/getTopFiveCompaniesAvgRating', adminController.getTopFiveCompaniesAvgRating);
router.get('/getTopFiveSeekersAccpReviews', adminController.getTopFiveSeekersAccpReviews);
router.get('/getTopTenCEORating', adminController.getTopTenCEORating);

module.exports = router;