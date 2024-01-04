import { validate } from "../validation/validation.js";
import { createFavoriteValidation, getFavoriteValidation } from "../validation/favorite-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {getProductValidation} from "../validation/product-validation.js";

// ...
const create = async (user, request) => {
    const favorite = validate(createFavoriteValidation, request);
    favorite.id_user =user.id;

    return prismaClient.favorite.create({
        data: favorite,
        select: {
            id_favorite: true,
            id_produk: true,
            id_user: true
        }
    });
}

const get = async () => {

    const favorite = await prismaClient.favorite.findMany({
    
        select: {
            id_favorite: true,
            id_produk: true,
            id_user: true
        }
    });

    if (!favorite) {
        throw new ResponseError(404, "favorite not found");
    }

    return favorite;
}


const remove = async (favoriteId) => {
    favoriteId = validate(getFavoriteValidation, favoriteId);

    const totalInDatabase = await prismaClient.favorite.count({
        where: {
            id: favoriteId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "favorite is not found");
    }

    return prismaClient.favorite.delete({
        where: {
            id: favoriteId
        }
    });
}




export default {
    create,
    get,
    remove
}
