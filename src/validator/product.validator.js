import productService from "../services/product.service.js";

const validateTypeFields = (product) => {
    if (typeof product.title !== "string")
        return { valid: false, reason: "Title must be a string" };
    if (typeof product.description !== "string")
        return { valid: false, reason: "Description must be a string" };
    if (typeof product.code !== "string")
        return { valid: false, reason: "Code must be a string" };
    if (typeof product.price !== "number" || product.price < 0)
        return {
            valid: false,
            reason: "Price must be a non-negative number",
        };
    if (typeof product.status !== "boolean")
        return { valid: false, reason: "Status must be a boolean" };
    if (typeof product.stock !== "number" || product.stock < 0)
        return {
            valid: false,
            reason: "Stock must be a non-negative number",
        };
    if (typeof product.category !== "string")
        return { valid: false, reason: "Category must be a string" };
    if (product.thumbnails && !Array.isArray(product.thumbnails))
        return { valid: false, reason: "Thumbnails must be an array" };
    return { valid: true };
};

class ProductValidator {
    validateFields(product) {
        const requiredFields = [
            "title",
            "description",
            "code",
            "price",
            "status",
            "stock",
            "category",
            "thumbnails",
        ];
        for (const field of requiredFields) {
            if (
                product[field] === undefined ||
                product[field] === null ||
                product[field] === ""
            )
                return {
                    valid: false,
                    reason: `Missing or empty field: ${field}`,
                };
        }

        const typeValidation = validateTypeFields(product);
        if (!typeValidation.valid) return typeValidation;

        return { valid: true };
    }

    async existsCode(product) {
        const existsProduct = await productService.getOneByCode(product.code);
        return !existsProduct ? true : false;
    }

    async validateAll(product) {
        const fieldValidation = this.validateFields(product);
        if (!fieldValidation.valid) return fieldValidation;

        const uniqueCode = await this.existsCode(product);
        if (!uniqueCode) return { valid: false, reason: "Code already exists" };
        return { valid: true };
    }
}

export default new ProductValidator();
