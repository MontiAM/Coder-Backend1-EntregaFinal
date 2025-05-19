import productService from "../services/product.service.js";
import validateProduct from "../validator/product.validator.js";

class ProductController {
    async get(req, res) {
        const products = await productService.get();
        res.status(200).json(products);
    }

    async getOne(req, res) {
        const { pid } = req.params;
        const product = await productService.getOne(pid);
        res.json(product);
    }

    async create(req, res) {
        const product = req.body;
        const validProduct = await validateProduct.validateAll(product);
        if (!validProduct.valid) {
            return res.status(400).json(validProduct.reason);
        }
        const newProduct = await productService.create(product);
        res.status(201).json(newProduct);
    }

    async update(req, res) {
        const { pid } = req.params;
        const product = req.body;
        const updatedProduct = await productService.update(pid, product);
        res.json(updatedProduct);
    }

    async delete(req, res) {
        const { pid } = req.params;
        const deletedProduct = await productService.delete(pid);
        res.json(deletedProduct);
    }
}

export default new ProductController();
