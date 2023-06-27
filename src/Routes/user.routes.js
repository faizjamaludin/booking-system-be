const express = require("express");
const router = express.Router();
const userController = require("../Controllers/users.controller");

router.post("/", userController.createUser);
router.get("/id/:id", userController.getUser);
router.get("/login", userController.loginUser);

module.exports = router;
