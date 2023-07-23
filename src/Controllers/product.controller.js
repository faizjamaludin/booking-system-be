const productService = require('../Services/product.service');

const createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct(req);
        const imageUrl = `http://localhost:3001/assets/${product.name}/${product.images.originalName}`;
        product.imageUrl = imageUrl;

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createProduct
}