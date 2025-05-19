import productService from "../services/product.service.js";
import validateProduct from "../validator/product.validator.js";
import validateObjectId from "../validator/objectID.validator.js";

class ProductController {
    async get(req, res) {
        try {
            const products = await productService.get();
            if (!products) {
                return res.status(404).json({ error: "Products not found" });
            }
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getOne(req, res) {
        try {
            const { pid } = req.params;
            if (!validateObjectId(pid)) {
                return res.status(400).json({ error: "Invalid product id" });
            }
            const product = await productService.getOne(pid);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            return res.json(product);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const product = req.body;
            const validProduct = await validateProduct.validateCreate(product);
            if (!validProduct.valid) {
                return res.status(400).json(validProduct.reason);
            }
            const newProduct = await productService.create(product);
            return res.status(201).json(newProduct);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { pid } = req.params;
            if (!validateObjectId(pid)) {
                return res.status(400).json({ error: "Invalid product id" });
            }
            const product = req.body;

            const validProduct = await validateProduct.validateUpdate(product);
            if (!validProduct.valid) {
                return res.status(400).json(validProduct.reason);
            }

            const updatedProduct = await productService.update(pid, product);
            if (!updatedProduct) {
                return res.status(404).json({ error: "Product not found" });
            }
            return res.json(updatedProduct);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { pid } = req.params;
            if (!validateObjectId(pid)) {
                return res.status(400).json({ error: "Invalid product id" });
            }
            const deletedProduct = await productService.delete(pid);
            return res.json(deletedProduct);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new ProductController();
