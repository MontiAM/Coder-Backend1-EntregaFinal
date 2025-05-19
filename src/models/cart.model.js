import { model, Schema } from "mongoose";

const cart = {};

const cartSchema = new Schema(cart);
const Cart = model("Cart", cartSchema);
export default Cart;
