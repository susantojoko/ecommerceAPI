import favoriteService from "../service/favorite-service.js";
import { logger } from "../application/logging.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await favoriteService.create(user, request);
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
        const favoriteId = req.params.favoriteId;
        const result = await favoriteService.get(user, favoriteId);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const favoriteId = req.params.favoriteId;
        const request = req.body;
        request.id = favoriteId;

        const result = await favoriteService.update(user, request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const favoriteId = req.params.favoriteId;

        await favoriteService.remove(user, favoriteId);
        res.status(200).json({
            data: "OK"
        });
    } catch (e) {
        next(e);
    }
}


export default {
    create,
    get,
    update,
    remove
}
