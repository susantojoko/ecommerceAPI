import cartService from "../service/cart-service.js";
import { logger } from "../application/logging.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await cartService.create(user, request);
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
        const cartId = req.params.cartId;
        const result = await cartService.get(user, cartId);
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
        const cartId = req.params.cartId;
        const request = req.body;
        request.id_keranjang = cartId;

        const result = await cartService.update(user, request);
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
        const cartId = req.params.cartId;

        await ratingService.remove(user, cartId);
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
