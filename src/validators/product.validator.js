import productService from "../services/product.service.js";

class ProductValidator {
    async validateCreate(product) {
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
            ) {
                return {
                    valid: false,
                    reason: `Missing or empty field: ${field}`,
                };
            }
        }

        const typeCheck = this.validateTypes(product);
        if (!typeCheck.valid) return typeCheck;

        const exists = await productService.getOneByCode(product.code);
        if (exists) return { valid: false, reason: "Code already exists" };

        return { valid: true };
    }

    async validateUpdate(product) {
        const typeCheck = this.validateTypes(product, true);
        if (!typeCheck.valid) return typeCheck;

        if (product.code) {
            const exists = await productService.getOneByCode(product.code);
            if (exists) return { valid: false, reason: "Code already exists" };
        }

        return { valid: true };
    }

    validateTypes(product, isUpdate = false) {
        const validations = {
            title: "string",
            description: "string",
            code: "string",
            price: "number",
            status: "boolean",
            stock: "number",
            category: "string",
            thumbnails: "array",
        };

        for (const [field, type] of Object.entries(validations)) {
            const value = product[field];
            if (value === undefined) {
                if (isUpdate) continue;
                else return { valid: false, reason: `Missing field: ${field}` };
            }

            switch (type) {
                case "string":
                    if (typeof value !== "string")
                        return {
                            valid: false,
                            reason: `${field} must be a string`,
                        };
                    break;
                case "number":
                    if (typeof value !== "number" || value < 0)
                        return {
                            valid: false,
                            reason: `${field} must be a non-negative number`,
                        };
                    break;
                case "boolean":
                    if (typeof value !== "boolean")
                        return {
                            valid: false,
                            reason: `${field} must be a boolean`,
                        };
                    break;
                case "array":
                    if (!Array.isArray(value))
                        return {
                            valid: false,
                            reason: `${field} must be an array`,
                        };
                    break;
            }
        }

        return { valid: true };
    }
}

export default new ProductValidator();
