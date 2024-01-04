import Joi from "joi";

const createRatingValidation = Joi.object({
    komentar: Joi.string().max(255).required(),
    rating: Joi.number().integer().min(0).required()
});

const getRatingValidation = Joi.number().positive().required();

const updateRatingValidation = Joi.object({
    komentar: Joi.string().max(255).required(),
    rating: Joi.number().integer().min(0).required()
});


export {
    createRatingValidation,
    getRatingValidation,
    updateRatingValidation
};
