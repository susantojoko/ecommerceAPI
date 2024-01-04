import Joi from "joi";

const createChatValidation = Joi.object({
    id_sender: Joi.number().integer().max(10).optional(),
    id_receiver: Joi.number().integer().max(10).optional(),
    message: Joi.string().max(255).required(),
});

const getChatValidation = Joi.number().positive().required();

export {
    createChatValidation,
    getChatValidation,
}
