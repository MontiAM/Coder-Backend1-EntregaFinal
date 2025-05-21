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

            const products = await productService.get(filter, options);
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

// Para metodo GET de productos

// - opcional LIMIT default 10
// - opcional PAGE default page 1
// - opcional QUERY por estado y por categoria
// - opcional SORT asc o desc por precio

// Cambio estructura metodo GET productos
// {
//     status: success/error
//     payload: "Resultado de los productos solicitados"
//     totalPages: Total paginas
//     prevPage: Pagina anterior
//     nextPage: Pagina siguiente
//     page: Pagina actual
//     hasPrevPage: Indicador para saber si la pagina previa existe
//     hasNextPage: Indicador para saber si la pagina siguiente existe
//     prevLing: Link directo a la pagina previa (null si hasPrevPage=false) --> Hay que generarlo
//     nextLink: Link directo a la pagina siguiente (null si hasNextPage=false) --> Hay que generarlo
// }
