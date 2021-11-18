var express = require('express');
var router = express.Router();


router.get("/", function (res, res) {
    res.send("Hello from Indeed backend!");
});

module.exports = router;