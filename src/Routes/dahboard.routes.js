const express = require("express");
const router = express.Router();
const dashboardController = require("../Controllers/dashboard.controller");

router.get("/all", dashboardController.getAllData);
router.get("/:email", dashboardController.getUserData);

module.exports = router;
