const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const productController = require('../Controllers/product.controller')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const productName = req.body.productName;
        const uploadPath = path.join("Assets", productName);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post("/", upload.array("images"), productController.createProduct);

module.exports = router;