const express = require("express");
const router = express.Router();
const workProgress = require("../Controllers/workprogress.controller");

router.get("/all", workProgress.getWork); // create new booking in product details
router.put("/:id", workProgress.doneWork);
router.get("/user/:email", workProgress.getUserWorkProgress);

module.exports = router;
