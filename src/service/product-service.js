import { validate } from "../validation/validation.js";
import { createProductValidation, getProductValidation, updateProductValidation, searchProductValidation } from "../validation/product-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

// ...
const create = async (request) => {
    const product = validate(createProductValidation, request);

    return prismaClient.product.create({
        data: product,
        select: {
            id: true,
            image: true,
            name: true,
            brand: true,
            description: true,
            stok: true,
            price: true,
            created_at: true,
            updated_at: true
        }
    });
}

const get = async () => {

    const product = await prismaClient.product.findMany({
    
        select: {
            id: true,
            image: true,
            name: true,
            brand: true,
            description: true,
            stok: true,
            price: true,
            created_at: true,
            updated_at: true
        }
    });

    if (!product) {
        throw new ResponseError(404, "Product not found");
    }

    return product;
}


const update = async (request) => {
    const product = validate(updateProductValidation, request);

    const totalProductInDatabase = await prismaClient.product.count({
        where: {
            id: product.id
        }
    });

    if (totalProductInDatabase !== 1) {
        throw new ResponseError(404, "Product is not found");
    }

    return prismaClient.product.update({
        where: {
            id: product.id
        },
        data: {
            image: product.image,
            name: product.name,
            brand: product.brand,
            description: product.description,
            stok: product.stok,
            price: product.price
        },
        select: {
            id: true,
            image: true,
            name: true,
            brand: true,
            description: true,
            stok: true,
            price: true,
            created_at: true,
            updated_at: true
        }
    });
}

const remove = async (productId) => {
    productId = validate(getProductValidation, productId);

    const totalInDatabase = await prismaClient.product.count({
        where: {
            id: productId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "Product is not found");
    }

    return prismaClient.product.delete({
        where: {
            id: productId
        }
    });
}

const search = async (request) => {
    request = validate(searchProductValidation, request);

    const skip = (request.page - 1) * request.size;

    const filters = [];

    if (request.name) {
        filters.push({
            name: {
                contains: request.name
            }
        });
    }
    if (request.brand) {
        filters.push({
            brand: {
                contains: request.brand
            }
        });
    }

    const products = await prismaClient.product.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.product.count({
        where: {
            AND: filters
        }
    });

    return {
        data: products,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
}


export default {
    create,
    get,
    update,
    remove,
    search
}
