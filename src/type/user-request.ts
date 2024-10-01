import {Request} from "express";

export interface UserRequest extends Request {
    email?: string;
}