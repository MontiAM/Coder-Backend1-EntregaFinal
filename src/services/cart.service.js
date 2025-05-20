import Cart from "../models/cart.model.js";

class CartService {
    async get() {
        const carts = await Cart.find().populate("products.product");
        return carts;
    }
    async getOne(id) {
        const cart = await Cart.findById(id).populate("products.product");
        return cart;
    }
    async create(cart) {
        const newCart = await Cart.create(cart);
        return newCart;
    }
    async delete(id) {
        const deletedCart = await Cart.findByIdAndDelete(id);
        return deletedCart;
    }
    async addProductToCart(cartId, productId, quantity) {
        const cart = await Cart.updateOne(
            { _id: cartId },
            { $push: { products: { product: productId, quantity } } }
        );
        return cart;
    }
    async removeProductFromCart(cid, pid) {
        const cart = await Cart.updateOne(
            { _id: cid },
            { $pull: { products: { product: pid } } }
        );
        return cart;
    }
}

export default new CartService();
