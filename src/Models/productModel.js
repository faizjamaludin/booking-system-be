const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name: String,
    description: String,
    length: String,
    thickness: String,
    materials: String,
    images: [{
        path: String,
        originalName: String,
        mimeType: String
    }],
    dateCreated: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
