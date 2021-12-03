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

router.get("/job", employerController.getJobDetailsById);
router.post("/job", checkAuth, employerController.createJobPosting);
router.put("/job", checkAuth, employerController.updateJobPosting);
router.post("/application/status",checkAuth, employerController.updateApplicationStatus);
router.get("/reviews", employerController.getReviewsByCompanyId);
router.get("/reviewsWithKafka", employerController.getReviewsByCompanyIdKafka);
router.get("/", employerController.getEmployerProfile);
router.get("/reviewsWithSQLCaching",  employerController.getReviewsByCompanyIdSQLCaching);
router.get("/reviewsWithSQLCachingAndKafka", employerController.getReviewsByCompanyIdSQLCachingKafka);
router.get("/applications", employerController.getJobApplicationsByJobId);
router.post("/updateProfile", checkAuth, employerController.updateEmployerDetails);

module.exports = router;
