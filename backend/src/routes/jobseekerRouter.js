const jobseekerController = require('../controllers/jobseekerController');


var express = require('express');
var router = express.Router();

router.get("/search", jobseekerController.getSearchByTitleorLocation);
router.get("/search/company", jobseekerController.getSearchByCompanyName);
router.post("/jobs",jobseekerController.saveJobs);
router.get("/jobs",jobseekerController.getSavedJobs);
router.post("/reviews",jobseekerController.addReviews);



module.exports = router;