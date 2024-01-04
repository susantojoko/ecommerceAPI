import express from "express";
import {publicRouter} from "../route/public-api.js";
import {errorMiddleware} from "../middleware/error-middleware.js";
import {userRouter} from "../route/api.js";
// import cors from "cors";

export const web = express();
web.use(express.json());
// web.use(cors());
web.use((req, res, next) => {
    // Izinkan akses dari semua domain (dapat diganti dengan domain aplikasi Flutter Anda)
    res.header('Access-Control-Allow-Origin', '*');
    // Izinkan metode HTTP yang Anda perlukan (GET, POST, dll.)
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    // Izinkan header tambahan jika Anda memerlukannya
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);
