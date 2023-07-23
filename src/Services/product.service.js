const Product = require("../Models/productModel");

const createProduct = async (data) => {
  const arrData = data.body;
  const arrFile = data.files;

  const splitWord = (path) => {
    const parts = path.split("\\");
    return parts.slice(1).join("/");
  };

  const fileItem = arrFile.map((image, key) => {
    return {
      path: splitWord(image.path),
      originalName: image.originalname,
      mimeType: image.mimetype,
    };
  });

  const product = new Product({
    name: arrData.productName,
    description: arrData.description,
    length: arrData.length,
    thickness: arrData.thickness,
    materials: arrData.material,
    images: fileItem,
  });

  product.save();

  return product;
};

const getAllProduct = async () => {
  const product = await Product.find().sort({ dateCreated: 1 });

  return product;
};

const getProduct = async (data) => {
  const productId = data.params.id;
  const product = await Product.findById({ _id: productId });
  return product;
};

module.exports = {
  createProduct,
  getAllProduct,
  getProduct,
};
