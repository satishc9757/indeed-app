const jobseekerController = require('../controllers/jobseekerController');
var express = require('express');
// const { route } = require('.');
var router = express.Router();
const { checkAuth } = require("../Utils/passport");
// router.get("/search", jobseekerController.getSearchByTitleorLocation);
router.get("/search/company", checkAuth, jobseekerController.getSearchByCompanyName);
router.post("/jobs", jobseekerController.saveJobs);
router.get("/jobs", checkAuth, jobseekerController.getSavedJobs);
router.post("/reviews", checkAuth, jobseekerController.addReviews);
router.get("/reviews", checkAuth, jobseekerController.getReviews);

//router.get("/search", jobseekerController.getSearchByTitleorLocation);
// router.get("/search/company", jobseekerController.getSearchByCompanyName);

router.get("/", checkAuth, jobseekerController.getJobseekerProfile);
router.post("/", checkAuth, jobseekerController.updateJobseekerProfile);
router.get("/resume", checkAuth, jobseekerController.getJobseekerResume);
router.post("/resume/:seeker_id", checkAuth, jobseekerController.updateJobseekerResume);
router.post("/coverletter", checkAuth, jobseekerController.updateJobseekerCover);
router.post("/resume/delete", checkAuth, jobseekerController.deleteJobseekerResume);
router.get("/search", jobseekerController.getSearch);
router.post("/application", checkAuth, jobseekerController.createJobApplication);
router.post("/update/email", checkAuth, jobseekerController.updateEmail);
router.get("/appliedJobs", checkAuth, jobseekerController.getAppliedJobs);

router.get("/getSalariesByJobTitleLocation", jobseekerController.getSalariesByJobTitleLocation);

router.post("/email", jobseekerController.updateEmail);

module.exports = router;
