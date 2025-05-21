import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const product = {
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    code: {
        type: String,
        require: true,
        unique: true,
    },
    price: {
        type: Number,
        require: true,
    },
    status: {
        type: Boolean,
        require: true,
    },
    stock: {
        type: Number,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    thumbnails: {
        type: Array,
    },
};

const productSchema = new Schema(product);
productSchema.plugin(mongoosePaginate);
const Product = model("Product", productSchema);

export default Product;
