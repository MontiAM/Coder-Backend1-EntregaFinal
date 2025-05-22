import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const product = {
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        index: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        index: true,
    },
    thumbnails: {
        type: [String],
    },
};

const productSchema = new Schema(product);
productSchema.plugin(mongoosePaginate);
const Product = model("Product", productSchema);

export default Product;
