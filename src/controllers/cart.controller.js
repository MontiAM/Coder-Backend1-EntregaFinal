import cartValidator from "../validators/cart.validator.js";
import cartService from "../services/cart.service.js";
import productService from "../services/product.service.js";

class CartController {
    async get(req, res) {
        try {
            const carts = await cartService.get();
            res.status(200).json(carts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOne(req, res) {
        try {
            const { cid } = req.params;

            const idCheck = cartValidator.validateCartId(cid);
            if (!idCheck.valid)
                return res.status(400).json({ error: idCheck.reason });

            const cart = await cartService.getOne(cid);
            if (!cart) return res.status(404).json({ error: "Cart not found" });

            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const cart = req.body;
            const newCart = await cartService.create(cart);
            res.status(201).json(newCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { cid } = req.params;

            const idCheck = cartValidator.validateCartId(cid);
            if (!idCheck.valid)
                return res.status(400).json({ error: idCheck.reason });

            const cart = await cartService.getOne(cid);
            if (!cart) return res.status(404).json({ error: "Cart not found" });

            const deletedCart = await cartService.delete(cid);
            res.status(200).json(deletedCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addProductToCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;

            const cidCheck = cartValidator.validateCartId(cid);
            if (!cidCheck.valid)
                return res.status(400).json({ error: cidCheck.reason });

            const quantityCheck = cartValidator.validateQuantity(quantity);
            if (!quantityCheck.valid)
                return res.status(400).json({ error: quantityCheck.reason });

            const cart = await cartService.getOne(cid);
            if (!cart) return res.status(404).json({ error: "Cart not found" });

            const pidCheck = cartValidator.validateProductId(pid);
            if (!pidCheck.valid)
                return res.status(400).json({ error: pidCheck.reason });

            const product = await productService.getOne(pid);
            if (!product)
                return res.status(404).json({ error: "Product not found" });

            const updatedCart = await cartService.addProductToCart(
                cid,
                pid,
                quantity
            );
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async removeProductFromCart(req, res) {
        try {
            const { cid, pid } = req.params;

            const cidCheck = cartValidator.validateCartId(cid);
            if (!cidCheck.valid)
                return res.status(400).json({ error: cidCheck.reason });

            const pidCheck = cartValidator.validateProductId(pid);
            if (!pidCheck.valid)
                return res.status(400).json({ error: pidCheck.reason });

            const cart = await cartService.getOne(cid);
            if (!cart) return res.status(404).json({ error: "Cart not found" });

            const updatedCart = await cartService.removeProductFromCart(
                cid,
                pid
            );
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new CartController();
