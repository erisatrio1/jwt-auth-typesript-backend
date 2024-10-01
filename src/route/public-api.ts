import express from 'express'
import { UserController } from '../controller/user-controller';

export const publicRouter = express.Router();

publicRouter.get("/api/users/refresh", UserController.refreshToken);
publicRouter.post('/api/users', UserController.register);
publicRouter.post('/api/users/login', UserController.login);
publicRouter.delete("/api/users/current", UserController.logout);