import Joi from "joi";

const createCartValidation = Joi.object({
    id_produk:Joi.number().integer().min(0).required(),
    jumlah_produk: Joi.number().integer().min(0).required(),
    sub_total: Joi.number().integer().min(0).required()
});

const getCartValidation = Joi.number().positive().required();

const updateCartValidation = Joi.object({
    jumlah_produk: Joi.number().integer().min(0).required(),
    sub_total: Joi.number().integer().min(0).required()
});


export {
    createCartValidation,
    getCartValidation,
    updateCartValidation
};
