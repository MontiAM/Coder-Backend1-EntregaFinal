import Router from "express";
import productService from "../services/product.service.js";

const router = Router();

router.get("/addProduct", (req, res) => res.render("addProduct"));
router.get("/products", (req, res) => res.render("products"));
router.get("/products/:pid", async (req, res) => {
    const { pid } = req.params;
    const productInstance = await productService.getOne(pid);

    if (!productInstance) {
        return res.status(404).send({ error: "Producto no encontrado" });
    }
    const product = productInstance.toJSON
        ? productInstance.toJSON()
        : JSON.parse(JSON.stringify(productInstance));
    res.render("producsID", { product });
});
router.get("/cart", (req, res) => {
    res.render("cart");
});

export default router;
