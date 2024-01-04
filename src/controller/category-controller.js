import categoryService from "../service/category-service.js";
import { logger } from "../application/logging.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await categoryService.create(request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;
        const result = await categoryService.get(categoryId);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;
        const request = req.body;
        request.id_kategori = categoryId;

        const result = await categoryService.update(request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;

        await categoryService.remove(categoryId);
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
