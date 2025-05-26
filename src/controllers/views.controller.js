import productService from "../services/product.service.js";
import cartService from "../services/cart.service.js";
class ViewsController {
    async getAddProduct(req, res) {
        res.render("addProduct");
    }
    async getProducts(req, res) {
        res.render("products");
    }
    async getProductId(req, res) {
        const { pid } = req.params;
        const productInstance = await productService.getOne(pid);

        if (!productInstance) {
            return res.status(404).send({ error: "Producto no encontrado" });
        }
        const product = productInstance.toJSON
            ? productInstance.toJSON()
            : JSON.parse(JSON.stringify(productInstance));
        res.render("producsID", { product });
    }
    async getCartId(req, res) {
        const { cid } = req.params;
        const cart = await cartService.getOne(cid);
        const cartProducts = cart.products.map((item) => ({
            product: item.product.toJSON
                ? item.product.toJSON()
                : JSON.parse(JSON.stringify(item.product)),
            quantity: item.quantity,
            _id: item._id.toString(),
        }));
        res.render("cart", { cartProducts, cid });
    }
}

export default new ViewsController();
