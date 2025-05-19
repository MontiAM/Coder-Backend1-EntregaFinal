import Product from "../models/product.model.js";

class ProductService {
    async get() {
        const products = await Product.find();
        return products;
    }
    async getOne(id) {
        const product = await Product.findById(id);
        return product;
    }
    async getOneByCode(code) {
        const product = await Product.findOne({ code: code });
        return product;
    }
    async create(product) {
        const newProduct = await Product.create(product);
        return newProduct;
    }
    async update(id, product) {
        const updatedProduct = await Product.findByIdAndUpdate(id, product);
        return updatedProduct;
    }
    async delete(id) {
        const deletedProduct = await Product.findByIdAndDelete(id);
        return deletedProduct;
    }
}

export default new ProductService();
