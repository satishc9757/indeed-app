var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");
const {auth} = require('../Utils/passport');

auth();
router.get("/", function (res, res) {
    res.send("Hello from Indeed backend!");
});

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/getCompanyId", userController.getCompanyId);
module.exports = router;