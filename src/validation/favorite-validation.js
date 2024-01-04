import Joi from "joi";

const createFavoriteValidation = Joi.object({
    id_produk: Joi.number().integer().min(0).required()
});

const getFavoriteValidation = Joi.number().positive().required();



export {
    createFavoriteValidation,
    getFavoriteValidation
};
