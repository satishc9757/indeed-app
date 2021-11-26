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

var express = require("express");
var router = express.Router();

router.get("/job", employerController.getJobDetailsById);
router.post("/job", employerController.createJobPosting);
router.put("/job", employerController.updateJobPosting);
router.put("/application/status", employerController.updateApplicationStatus);
router.get("/reviews", employerController.getReviewsByCompanyId);
router.get("/reviewsWithKafka", employerController.getReviewsByCompanyIdKafka);

router.get("/reviewsWithSQLCaching", employerController.getReviewsByCompanyIdSQLCaching);
router.get("/reviewsWithSQLCachingAndKafka", employerController.getReviewsByCompanyIdSQLCachingKafka);
router.get("/applications", employerController.getJobApplicationsByJobId);
router.post("/updateProfile", employerController.updateEmployerDetails);

module.exports = router;
