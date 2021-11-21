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

// router.post("/jobs", employerController.getJobsByCompanyId);
router.get("/reviews", employerController.getReviewsByCompanyId);
router.get("/reviewsWithKafka", employerController.getReviewsByCompanyIdKafka);

router.get("/reviewsWithSQLCaching", employerController.getReviewsByCompanyIdSQLCaching);
router.get("/reviewsWithSQLCachingAndKafka", employerController.getReviewsByCompanyIdSQLCachingKafka);


module.exports = router;
