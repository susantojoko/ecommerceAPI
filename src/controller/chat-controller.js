import chatService from "../service/chat-service.js";
import { logger } from "../application/logging.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await chatService.create(user, request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    } 
}

const get = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await chatService.get(user);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}




export default {
    create,
    get
}
