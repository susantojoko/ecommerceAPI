import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import productController from "../controller/product-controller.js";
import userController from "../controller/user-controller.js";
import contactController from "../controller/contact-controller.js";
import addressController from "../controller/address-controller.js";
import ratingController from "../controller/rating-controller.js";
import categoryController from "../controller/category-controller.js";
import chatController from "../controller/chat-controller.js";
import favoriteController from "../controller/favorite-controller.js";
import cartController from "../controller/cart-controller.js";


const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// Contact API
userRouter.post('/api/contacts', contactController.create);
userRouter.get('/api/contacts/:contactId', contactController.get);
userRouter.put('/api/contacts/:contactId', contactController.update);
userRouter.delete('/api/contacts/:contactId', contactController.remove);
userRouter.get('/api/contacts', contactController.search);

// Address API
userRouter.post('/api/contacts/:contactId/addresses', addressController.create);
userRouter.get('/api/contacts/:contactId/addresses/:addressId', addressController.get);
userRouter.put('/api/contacts/:contactId/addresses/:addressId', addressController.update);
userRouter.delete('/api/contacts/:contactId/addresses/:addressId', addressController.remove);
userRouter.get('/api/contacts/:contactId/addresses', addressController.list);

// Product API
userRouter.post('/api/products', productController.create);
userRouter.get('/api/products', productController.get);
userRouter.put('/api/products/:productId', productController.update);
userRouter.delete('/api/products/:productId', productController.remove);
userRouter.get('/api/products', productController.search);

userRouter.post('/api/ratings', ratingController.create);
userRouter.get('/api/ratings', ratingController.get);
userRouter.put('/api/ratings/:ratingId', ratingController.update);
userRouter.delete('/api/ratings/:ratingId', ratingController.remove);

userRouter.post('/api/categories', categoryController.create);
userRouter.get('/api/categories', categoryController.get);
userRouter.put('/api/categories/:categoryId', categoryController.update);
userRouter.delete('/api/categories/:categoryId', categoryController.remove);

userRouter.post('/api/chat', chatController.create);
userRouter.get('/api/chat', chatController.get);

userRouter.post('/api/favorite', favoriteController.create);
userRouter.get('/api/favorite', favoriteController.get);

userRouter.post('/api/cart', cartController.create);
userRouter.get('/api/cart', cartController.get);
userRouter.put('/api/cart/:cartId', cartController.update);

export {
    userRouter
}
