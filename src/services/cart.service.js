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
    async delete(id, deleteCart = "false") {
        let returnDeletedCart;
        if (deleteCart === "true") {
            returnDeletedCart = await Cart.findByIdAndDelete(id);
        } else {
            returnDeletedCart = await Cart.findByIdAndUpdate(
                id,
                { products: [] },
                { new: true }
            );
        }
        return returnDeletedCart;
    }
    async addProductToCart(cartId, productId, quantity) {
        const cart = await Cart.findById(cartId);
        if (!cart) throw new Error("Cart not found");

        const existingProduct = cart.products.find(
            (p) => p.product.toString() === productId.toString()
        );

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        return await Cart.findById(cartId).populate("products.product");
    }
    async updateProductsToCart(cartId, products) {
        await this.delete(cartId);
        for (const product of products) {
            await this.addProductToCart(cartId, product._id, product.quantity);
        }
        return await Cart.findById(cartId).populate("products.product");
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
