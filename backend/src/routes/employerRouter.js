const employerController = require("../controllers/employerController");
const COMPANY_IMAGE_PATH = "images/company";
// const multer  = require('multer')
// const {checkAuth} = require('../jwt/passport')

//file upload setup
// const custFileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, CUST_IMAGE_PATH);
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     },
// });
const { checkAuth } = require("../Utils/passport");
var express = require("express");
var router = express.Router();

router.get("/job", checkAuth, employerController.getJobDetailsById);
router.post("/job", checkAuth, employerController.createJobPosting);
router.put("/job", checkAuth, employerController.updateJobPosting);
router.post("/application/status",checkAuth, employerController.updateApplicationStatus);
router.get("/reviews", checkAuth, employerController.getReviewsByCompanyId);
router.get("/reviewsWithKafka",checkAuth, employerController.getReviewsByCompanyIdKafka);
router.get("/", checkAuth, employerController.getEmployerProfile);
router.get("/reviewsWithSQLCaching", checkAuth, employerController.getReviewsByCompanyIdSQLCaching);
router.get("/reviewsWithSQLCachingAndKafka", checkAuth, employerController.getReviewsByCompanyIdSQLCachingKafka);
router.get("/applications", checkAuth, employerController.getJobApplicationsByJobId);
router.post("/updateProfile", checkAuth, employerController.updateEmployerDetails);

module.exports = router;
