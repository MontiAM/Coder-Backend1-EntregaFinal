import validateObjectId from "./objectId.validator.js";

class CartValidator {
    validateCartId(cid) {
        if (!validateObjectId(cid)) {
            return { valid: false, reason: "Invalid cart id" };
        }
        return { valid: true };
    }

    validateProductId(pid) {
        if (!validateObjectId(pid)) {
            return { valid: false, reason: "Invalid product id" };
        }
        return { valid: true };
    }

    validateQuantity(quantity) {
        if (quantity === undefined || quantity === null) {
            return { valid: false, reason: "Quantity is required" };
        }
        if (typeof quantity !== "number" || quantity <= 0) {
            return {
                valid: false,
                reason: "Quantity must be a number greater than 0",
            };
        }
        return { valid: true };
    }

    validateArrayProducts(products) {
        if (!Array.isArray(products)) {
            return { valid: false, reason: "Products must be an array" };
        }
        return { valid: true };
    }
    validateEmptyProducts(products) {
        for (const product of products) {
            if (!product._id || !product.quantity) {
                return {
                    valid: false,
                    reason: `Product ${product._id} must have both _id and quantity`,
                };
            }
        }
        return { valid: true };
    }

    validateProductsId(products) {
        for (const product of products) {
            const result = this.validateProductId(product._id);
            if (!result.valid) {
                return {
                    valid: false,
                    reason: `Product ${product._id} must have a valid product id`,
                };
            }
        }
        return { valid: true };
    }

    validateProductsQuantity(products) {
        for (const product of products) {
            const result = this.validateQuantity(product.quantity);
            if (!result.valid) {
                return {
                    valid: false,
                    reason: `Product ${product._id} must have a valid quantity`,
                };
            }
        }
        return { valid: true };
    }
}

export default new CartValidator();
