import Joi from "joi";

const createCategoryValidation = Joi.object({
    id_produk: Joi.number().integer().max(10).optional(),
    nama_kategori: Joi.string().max(255).required(),
    image: Joi.string().max(255).optional(),
    slug: Joi.string().required(),
    status: Joi.number().integer().min(0).required()
});

const getCategoryValidation = Joi.number().positive().required();

const updateCategoryValidation = Joi.object({
    id_kategori: Joi.number().positive().required(),
    id_produk: Joi.number().integer().max(10).optional(),
    nama_kategori: Joi.string().max(255).required(),
    image: Joi.string().max(255).optional(),
    slug: Joi.string().optional(),
    status: Joi.number().integer().min(0).optional()
});


export {
    createCategoryValidation,
    getCategoryValidation,
    updateCategoryValidation,
};
