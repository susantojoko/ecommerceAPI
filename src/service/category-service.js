import { validate } from "../validation/validation.js";
import { createCategoryValidation, getCategoryValidation, updateCategoryValidation } from "../validation/category-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

// ...
const create = async (request) => {
    const category = validate(createCategoryValidation, request);

    return prismaClient.category.create({
        data: category,
        select: {
            id_kategori: true,
            id_produk: true,
            nama_kategori: true,
            image: true,
            slug: true,
            status: true,
            created_at: true,
            updated_at: true
        }
    });
}

const get = async () => {

    const category = await prismaClient.category.findMany({
    
        select: {
            id_kategori: true,
            id_produk: true,
            nama_kategori: true,
            image: true,
            slug: true,
            status: true,
            created_at: true,
            updated_at: true
        }
    });

    if (!category) {
        throw new ResponseError(404, "Category not found");
    }

    return category;
}


const update = async (request) => {
    const category = validate(updateCategoryValidation, request);

    const totalCategoryInDatabase = await prismaClient.category.count({
        where: {
            id_kategori: category.id_kategori
        }
    });

    if (totalCategoryInDatabase !== 1) {
        throw new ResponseError(404, "Category is not found");
    }

    return prismaClient.category.update({
        where: {
            id_kategori: category.id_kategori
        },
        data: {
            nama_kategori: category.nama_kategori,
            image: category.image,
            slug: category.slug,
            status: category.status
        },
        select: {
            id_kategori: true,
            id_produk: true,
            nama_kategori: true,
            image: true,
            slug: true,
            status: true,
            created_at: true,
            updated_at: true
        }
    });
}

const remove = async (categoryId) => {
    categoryId = validate(getCategoryValidation, categoryId);

    const totalInDatabase = await prismaClient.category.count({
        where: {
            id_kategori: categoryId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "Product is not found");
    }

    return prismaClient.category.delete({
        where: {
            id_kategori: categoryId
        }
    });
}



export default {
    create,
    get,
    update,
    remove,
}
