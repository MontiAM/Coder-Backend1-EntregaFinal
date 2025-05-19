import cartService from "../services/cart.service.js";

class CartController {
    async get(req, res) {
        const cart = await cartService.get();
        res.status(200).json(cart);
    }
    async getOne(req, res) {
        const { cid } = req.params;
        const cart = await cartService.getOne(cid);
        res.status(200).json(cart);
    }
    async create(req, res) {
        const cart = req.body;
        const newCart = await cartService.create(cart);
        res.status(201).json(newCart);
    }
    async delete(req, res) {
        const { cid } = req.params;
        const deletedCart = await cartService.delete(cid);
        res.status(200).json(deletedCart);
    }
    async addProductToCart(req, res) {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await cartService.addProductToCart(cid, pid, quantity);
        res.status(200).json(cart);
    }
    async removeProductFromCart(req, res) {
        const { cid, pid } = req.params;
        const cart = await cartService.removeProductFromCart(cid, pid);
        res.status(200).json(cart);
    }
}

export default new CartController();
