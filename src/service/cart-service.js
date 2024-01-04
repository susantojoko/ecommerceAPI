import { validate } from "../validation/validation.js";
import { createCartValidation, getCartValidation, updateCartValidation } from "../validation/cart-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {getProductValidation} from "../validation/product-validation.js";

// ...
const create = async (user, request) => {
    const cart = validate(createCartValidation, request);
    cart.id_user =user.id;

    return prismaClient.keranjang.create({
        data: cart,
        select: {
            id_keranjang: true,
            id_produk:true,
            jumlah_produk: true,
            sub_total: true
        }
    });
}

const get = async () => {

    const cart = await prismaClient.cart.findMany({
    
        select: {
            id_keranjang: true,
            id_user,
            id_produk: true,
            jumlah_produk: true,
            sub_total: true
        }
    });

    if (!cart) {
        throw new ResponseError(404, "Cart not found");
    }

    return cart;
}


const update = async (request) => {
    const rating = validate(updateCartValidation, request);

    const totalCartInDatabase = await prismaClient.cart.count({
        where: {
            id: rating.id
        }
    });

    if (totalCartInDatabase !== 1) {
        throw new ResponseError(404, "rating is not found");
    }

    return prismaClient.cart.update({
        where: {
            id: cart.id_keranjang
        },
        data: {
            id_keranjang: cart.id_keranjang,
            id_produk: cart.id_produk,
            id_user: cart.id_user,
            jumlah_produk: cart.jumlah_produk,
            sub_total: cart.sub_total
        },
        select: {
            id_keranjang: true,
            id_user: true,
            id_produk: true,
            jumlah_produk: true,
            sub_total: true
        }
    });
}

const remove = async (cartId) => {
    cartId = validate(getCartValidation, cartId);

    const totalInDatabase = await prismaClient.cart.count({
        where: {
            id: cartId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "Keranjang is not found");
    }

    return prismaClient.cart.delete({
        where: {
            id: cartId
        }
    });
}




export default {
    create,
    get,
    update,
    remove
}
