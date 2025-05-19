import productService from "../services/product.service.js";

class ProductValidator {
    async existsCode(product) {
        const existsProduct = await productService.getOneByCode(product.code);
        return !existsProduct ? true : false;
    }

    validateCreateTypeFields(product) {
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
    }
    validateCreateFields(product) {
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

        const typeValidation = this.validateCreateTypeFields(product);
        if (!typeValidation.valid) return typeValidation;

        return { valid: true };
    }
    async validateCreate(product) {
        const fieldValidation = this.validateCreateFields(product);
        if (!fieldValidation.valid) return fieldValidation;

        const uniqueCode = await this.existsCode(product);
        if (!uniqueCode) return { valid: false, reason: "Code already exists" };
        return { valid: true };
    }

    validateUpdateTypeFields(product) {
        if (product.title !== undefined && typeof product.title !== "string")
            return { valid: false, reason: "Title must be a string" };
        if (
            product.description !== undefined &&
            typeof product.description !== "string"
        )
            return { valid: false, reason: "Description must be a string" };
        if (product.code !== undefined && typeof product.code !== "string")
            return { valid: false, reason: "Code must be a string" };
        if (
            product.price !== undefined &&
            (typeof product.price !== "number" || product.price < 0)
        )
            return {
                valid: false,
                reason: "Price must be a non-negative number",
            };
        if (product.status !== undefined && typeof product.status !== "boolean")
            return { valid: false, reason: "Status must be a boolean" };
        if (
            product.stock !== undefined &&
            (typeof product.stock !== "number" || product.stock < 0)
        )
            return {
                valid: false,
                reason: "Stock must be a non-negative number",
            };
        if (
            product.category !== undefined &&
            typeof product.category !== "string"
        )
            return { valid: false, reason: "Category must be a string" };
        if (
            product.thumbnails !== undefined &&
            !Array.isArray(product.thumbnails)
        )
            return { valid: false, reason: "Thumbnails must be an array" };
        return { valid: true };
    }

    async validateUpdate(product) {
        const typeValidation = this.validateUpdateTypeFields(product);

        if (!typeValidation.valid) return typeValidation;

        if (
            product.code !== undefined &&
            (await this.existsCode(product.code))
        ) {
            return { valid: false, reason: "Code already exists" };
        }
        return { valid: true };
    }
}

export default new ProductValidator();
