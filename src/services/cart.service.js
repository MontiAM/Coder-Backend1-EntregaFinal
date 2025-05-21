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
    async delete(id, deleteCart) {
        let deletedCart;
        if (deleteCart === "true") {
            deletedCart = await Cart.findByIdAndDelete(id);
        } else {
            deletedCart = await Cart.findByIdAndUpdate(
                id,
                { products: [] },
                { new: true }
            );
        }
        return deletedCart;
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
    async addProductsToCart(cartId, products) {
        products.forEach(async (product) => {
            await this.addProductToCart(
                cartId,
                product.product,
                product.quantity
            );
        });
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
