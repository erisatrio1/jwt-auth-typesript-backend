import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { publicRouter } from "../route/public-api";
import { apiRouter } from "../route/api";
import cookieParser from 'cookie-parser';

export const web = express();
web.use(express.json());
web.use(cookieParser());
web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);