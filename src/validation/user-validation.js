import Joi from "joi";

const registerUserValidation = Joi.object({
    email: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
    name: Joi.string().max(255).required()
});

const loginUserValidation = Joi.object({
    email: Joi.string().max(255).required(),
    password: Joi.string().max(255).required()
});

const getUserValidation = Joi.string().max(255).required();

const updateUserValidation = Joi.object({
    email: Joi.string().max(255).required(),
    password: Joi.string().max(255).optional(),
    name: Joi.string().max(255).optional()
})

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}
      