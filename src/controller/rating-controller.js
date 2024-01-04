import ratingService from "../service/rating-service.js";
import { logger } from "../application/logging.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await ratingService.create(user, request);
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
        const ratingId = req.params.ratingId;
        const result = await ratingService.get(user, ratingId);
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
        const ratingId = req.params.ratingId;
        const request = req.body;
        request.id = ratingId;

        const result = await ratingService.update(user, request);
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
        const ratingId = req.params.ratingId;

        await ratingService.remove(user, ratingId);
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
