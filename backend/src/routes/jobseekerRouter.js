const jobseekerController = require('../controllers/jobseekerController');


var express = require('express');
var router = express.Router();

router.get("/search", jobseekerController.getSearchByTitleorLocation);
router.get("/search/company", jobseekerController.getSearchByCompanyName);


module.exports = router;