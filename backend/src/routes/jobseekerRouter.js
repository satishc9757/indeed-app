const jobseekerController = require('../controllers/jobseekerController');
var express = require('express');
// const { route } = require('.');
var router = express.Router();

// router.get("/search", jobseekerController.getSearchByTitleorLocation);
router.get("/search/company", jobseekerController.getSearchByCompanyName);
router.post("/jobs",jobseekerController.saveJobs);
router.get("/jobs",jobseekerController.getSavedJobs);
router.post("/reviews",jobseekerController.addReviews);
router.get("/reviews",jobseekerController.getReviews);

//router.get("/search", jobseekerController.getSearchByTitleorLocation);
// router.get("/search/company", jobseekerController.getSearchByCompanyName);
router.get("/", jobseekerController.getJobseekerProfile);
router.post("/", jobseekerController.updateJobseekerProfile);
router.get("/resume", jobseekerController.getJobseekerResume);
router.post("/resume/:seeker_id", jobseekerController.updateJobseekerResume);
router.post("/coverletter", jobseekerController.updateJobseekerCover);
router.post("/resume/delete", jobseekerController.deleteJobseekerResume);
router.get("/search", jobseekerController.getSearch);
router.post("/application", jobseekerController.createJobApplication);
router.post("/update/email", jobseekerController.updateEmail);
router.get("/appliedJobs", jobseekerController.getAppliedJobs);
router.post("/email", jobseekerController.updateEmail);



module.exports = router;
