const express = require("express");
const router = express.Router();
const workProgress = require("../Controllers/workprogress.controller");

router.post("/", workProgress.createWork); // create new booking in product details

module.exports = router;
