const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");

// Define routes separately for each controller function
router.post("/register", studentController.registerStudent);
router.post("/loginStudent", studentController.loginStudent);

module.exports = router;
