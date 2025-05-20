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
}

export default new CartValidator();
