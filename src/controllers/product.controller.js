import productService from "../services/product.service.js";
import validateProduct from "../validators/product.validator.js";
import validateObjectId from "../validators/objectId.validator.js";

const defaultOptions = {
    limit: 10,
    page: 1,
    sort: { price: 1 },
    lean: true,
};

class ProductController {
    async get(req, res) {
        try {
            const userOptions = {};

            if (req.query.limit) {
                const parsedLimit = parseInt(req.query.limit);
                if (!isNaN(parsedLimit)) userOptions.limit = parsedLimit;
            }

            if (req.query.page) {
                const parsedPage = parseInt(req.query.page);
                if (!isNaN(parsedPage)) userOptions.page = parsedPage;
            }

            userOptions.sort =
                req.query.sort === "desc" ? { price: -1 } : { price: 1 };

            const options = {
                ...defaultOptions,
                ...userOptions,
            };

            const filter = {};
            if (req.query.category) {
                filter.category = new RegExp(`^${req.query.category}$`, "i");
            }

            if (req.query.status) {
                filter.status = new RegExp(`^${req.query.status}$`, "i");
            }

            filter.status = filter.status = "true" ? true : false;

            const products = await productService.get(filter, options);

            if (!products || !products.docs || products.docs.length === 0) {
                return res
                    .status(404)
                    .json({ status: "error", payload: "Products not found" });
            }

            const baseUrl = `${req.protocol}://${req.get("host")}${
                req.baseUrl
            }${req.path}`;
            const queryParams = new URLSearchParams(req.query);

            const prevLink = products.hasPrevPage
                ? `${baseUrl}?${new URLSearchParams({
                      ...Object.fromEntries(queryParams),
                      page: products.prevPage,
                  }).toString()}`
                : null;

            const nextLink = products.hasNextPage
                ? `${baseUrl}?${new URLSearchParams({
                      ...Object.fromEntries(queryParams),
                      page: products.nextPage,
                  }).toString()}`
                : null;

            return res.status(200).json({
                status: "success",
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink,
                nextLink,
            });
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
