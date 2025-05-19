import { model, Schema, Types } from "mongoose";

const cart = {
    products: [
        {
            product: {
                type: Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                min: 0,
            },
        },
    ],
};

const cartSchema = new Schema(cart);
const Cart = model("Cart", cartSchema);
export default Cart;
