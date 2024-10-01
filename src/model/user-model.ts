import { User } from "@prisma/client";

export type UserResponse = {
    name: string;
    email: string
    access_token?: string;
    refresh_token?: string | null;
}

export type CreateUserRequest = {
    name: string;
    email: string
    password: string;
    confPassword: string;
}

export type LoginUserRequest = {
    email: string;
    password: string;
}

export function toUserResponse(user: User) : UserResponse {
    return {
        name: user.name,
        email: user.email,
    }
}

export function toUserResponseLogin(user: User, access_token: string) : UserResponse {
    return {
        name: user.name,
        email: user.email,
        refresh_token: user.refresh_token,
        access_token: access_token
    }
}