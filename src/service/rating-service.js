import { validate } from "../validation/validation.js";
import { createRatingValidation, getRatingValidation, updateRatingValidation } from "../validation/rating-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {getProductValidation} from "../validation/product-validation.js";

// ...
const create = async (user, request) => {
    const rating = validate(createRatingValidation, request);
    rating.id_produk = 1;
    rating.id_user =user.id;

    return prismaClient.rating.create({
        data: rating,
        select: {
            id_rating: true,
            rating: true,
            komentar: true,
            created_at: true,
            modified_at: true
        }
    });
}

const get = async () => {

    const rating = await prismaClient.rating.findMany({
    
        select: {
            id_rating: true,
            id_user: true,
            id_produk: true,
            rating: true,
            komentar: true,
            created_at: true,
            modified_at: true
        }
    });

    if (!rating) {
        throw new ResponseError(404, "Rating not found");
    }

    return rating;
}


const update = async (request) => {
    const rating = validate(updateRatingValidation, request);

    const totalratingInDatabase = await prismaClient.rating.count({
        where: {
            id: rating.id
        }
    });

    if (totalratingInDatabase !== 1) {
        throw new ResponseError(404, "rating is not found");
    }

    return prismaClient.rating.update({
        where: {
            id: rating.id
        },
        data: {
            id_rating: rating.id_rating,
            id_produk: rating.id_produk,
            id_user: rating.id_user,
            rating: rating.rating,
            komentar: rating.komentar
        },
        select: {
            id_rating: true,
            id_user: true,
            id_produk: true,
            rating: true,
            komentar: true,
            created_at: true,
            updated_at: true
        }
    });
}

const remove = async (ratingId) => {
    ratingId = validate(getRatingValidation, ratingId);

    const totalInDatabase = await prismaClient.rating.count({
        where: {
            id: ratingId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "Rating is not found");
    }

    return prismaClient.rating.delete({
        where: {
            id: ratingId
        }
    });
}




export default {
    create,
    get,
    update,
    remove
}
