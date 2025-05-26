import cartValidator from "../validators/cart.validator.js";
import cartService from "../services/cart.service.js";
import productService from "../services/product.service.js";

class CartController {
    async get(req, res) {
        try {
            const carts = await cartService.get();
            res.status(200).json({ status: "success", payload: carts });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
    async getOne(req, res) {
        try {
            const { cid } = req.params;

            const idCheck = cartValidator.validateCartId(cid);
            if (!idCheck.valid)
                return res
                    .status(400)
                    .json({ status: "error", message: idCheck.reason });

            const cart = await cartService.getOne(cid);
            if (!cart)
                return res
                    .status(404)
                    .json({ status: "error", message: "Cart not found" });

            res.status(200).json({ status: "success", payload: cart });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
    async create(req, res) {
        try {
            const cart = req.body;
            const newCart = await cartService.create(cart);
            res.status(201).json({ status: "success", payload: newCart });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
    async delete(req, res) {
        try {
            const { cid } = req.params;
            const { deleteCart } = req.query || "false";

            const idCheck = cartValidator.validateCartId(cid);
            if (!idCheck.valid)
                return res
                    .status(400)
                    .json({ status: "error", message: idCheck.reason });

            const cart = await cartService.getOne(cid);
            if (!cart)
                return res
                    .status(404)
                    .json({ status: "error", message: "Cart not found" });

            const deletedCart = await cartService.delete(cid, deleteCart);

            res.status(200).json({ status: "success", payload: deletedCart });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
    async postProductToCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;

            const cidCheck = cartValidator.validateCartId(cid);
            if (!cidCheck.valid)
                return res
                    .status(400)
                    .json({ status: "error", message: cidCheck.reason });

            const quantityCheck = cartValidator.validateQuantity(quantity);
            if (!quantityCheck.valid)
                return res
                    .status(400)
                    .json({ status: "error", message: quantityCheck.reason });

            const cart = await cartService.getOne(cid);
            if (!cart)
                return res
                    .status(404)
                    .json({ status: "error", message: "Cart not found" });

            const pidCheck = cartValidator.validateProductId(pid);
            if (!pidCheck.valid)
                return res
                    .status(400)
                    .json({ status: "error", message: pidCheck.reason });

            const product = await productService.getOne(pid);
            if (!product)
                return res
                    .status(404)
                    .json({ status: "error", message: "Product not found" });

            const updatedCart = await cartService.addProductToCart(
                cid,
                pid,
                quantity
            );
            res.status(200).json({ status: "success", payload: updatedCart });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
    async updateQuantityProductToCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;

            const cidCheck = cartValidator.validateCartId(cid);
            if (!cidCheck.valid)
                return res
                    .status(400)
                    .json({ status: "error", message: cidCheck.reason });

            const quantityCheck = cartValidator.validateQuantity(quantity);
            if (!quantityCheck.valid)
                return res
                    .status(400)
                    .json({ status: "error", message: quantityCheck.reason });

            const cart = await cartService.getOne(cid);
            if (!cart)
                return res
                    .status(404)
                    .json({ status: "error", message: "Cart not found" });

            const pidCheck = cartValidator.validateProductId(pid);
            if (!pidCheck.valid)
                return res
                    .status(400)
                    .json({ status: "error", message: pidCheck.reason });

            const product = await productService.getOne(pid);
            if (!product)
                return res
                    .status(404)
                    .json({ status: "error", message: "Product not found" });

            const updatedCart = await cartService.addProductToCart(
                cid,
                pid,
                quantity
            );
            res.status(200).json({ status: "success", payload: updatedCart });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
    async updateProductsToCart(req, res) {
        try {
            const { cid } = req.params;
            const cidCheck = cartValidator.validateCartId(cid);
            if (!cidCheck.valid)
                return res
                    .status(400)
                    .json({ status: "error", message: cidCheck.reason });

            const products = req.body;

            console.log(products);

            let validate;
            validate = cartValidator.validateArrayProducts(products);
            if (!validate.valid) {
                return res
                    .status(400)
                    .json({ status: "error", message: validate.reason });
            }
            validate = cartValidator.validateEmptyProducts(products);
            if (!validate.valid) {
                return res
                    .status(400)
                    .json({ status: "error", message: validate.reason });
            }
            validate = cartValidator.validateProductsId(products);
            if (!validate.valid) {
                return res
                    .status(400)
                    .json({ status: "error", message: validate.reason });
            }
            validate = cartValidator.validateProductsQuantity(products);
            if (!validate.valid) {
                return res
                    .status(400)
                    .json({ status: "error", message: validate.reason });
            }

            const cart = await cartService.updateProductsToCart(cid, products);
            res.status(200).json({ status: "success", payload: cart });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
    async removeProductFromCart(req, res) {
        try {
            const { cid, pid } = req.params;

            const cidCheck = cartValidator.validateCartId(cid);
            if (!cidCheck.valid)
                return res
                    .status(400)
                    .json({ status: "error", message: cidCheck.reason });

            const pidCheck = cartValidator.validateProductId(pid);
            if (!pidCheck.valid)
                return res
                    .status(400)
                    .json({ status: "error", message: pidCheck.reason });

            const cart = await cartService.getOne(cid);
            if (!cart)
                return res
                    .status(404)
                    .json({ status: "error", message: "Cart not found" });

            const updatedCart = await cartService.removeProductFromCart(
                cid,
                pid
            );
            res.status(200).json({ status: "success", payload: updatedCart });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
}

export default new CartController();
