const Product = require('../Models/productModel');

const createProduct = async (data) => {

    const arrData = data.body;
    const arrFile = data.files;

    const fileItem = arrFile.map((image, key) => {
        return {
            path: image.path,
            originalName: image.originalname,
            mimeType: image.mimetype
        }
    });

    const product = new Product({
        name: arrData.productName,
        description: arrData.description,
        length: arrData.length,
        thickness: arrData.thickness,
        materials: arrData.material,
        images: fileItem
    });

    product.save();

    return product

}

module.exports = {
    createProduct
}