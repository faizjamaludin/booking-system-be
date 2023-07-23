const productService = require("../Services/product.service");

const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req);
    const imageUrl = `http://localhost:3001/${product.name}/${product.images.originalName}`;
    product.imageUrl = imageUrl;

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    const product = await productService.getAllProduct();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProduct(req);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProduct,
};
