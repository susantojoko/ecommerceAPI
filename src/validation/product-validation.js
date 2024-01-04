import Joi from "joi";

const createProductValidation = Joi.object({
    image: Joi.string().uri().optional(),
    name: Joi.string().max(255).required(),
    brand: Joi.string().max(255).optional(),
    description: Joi.string().optional(),
    stok: Joi.number().integer().min(0).required(),
    price: Joi.number().integer().min(0).required()
});

const getProductValidation = Joi.number().positive().required();

const updateProductValidation = Joi.object({
    id: Joi.number().positive().required(),
    image: Joi.string().optional(),
    name: Joi.string().max(255).optional(),
    brand: Joi.string().max(255).optional(),
    description: Joi.string().optional(),
    stok: Joi.number().integer().min(0).optional(),
    price: Joi.number().integer().min(0).required()
});

const searchProductValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().optional(),
    brand: Joi.string().optional(),
    minPrice: Joi.number().min(0).optional(),
    maxPrice: Joi.number().min(0).optional(),
    minStok: Joi.number().min(0).optional(),
    maxStok: Joi.number().min(0).optional()
});

export {
    createProductValidation,
    getProductValidation,
    updateProductValidation,
    searchProductValidation
};
