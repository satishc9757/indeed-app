const jobseekerController = require('../controllers/jobseekerController');


var express = require('express');
var router = express.Router();

router.get("/search", jobseekerController);
router.get("/search/company", jobseekerController);


module.exports = router;