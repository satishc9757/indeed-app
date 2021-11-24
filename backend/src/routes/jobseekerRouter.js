const jobseekerController = require('../controllers/jobseekerController');


var express = require('express');
var router = express.Router();

router.get("/search", jobseekerController.getSearch);
router.post("/application", jobseekerController.createJobApplication);


module.exports = router;