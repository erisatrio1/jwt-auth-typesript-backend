import bcrypt from 'bcrypt'
import { CreateUserRequest, UserResponse, toUserResponse, LoginUserRequest, toUserResponseLogin } from '../model/user-model';
import { Validation } from '../validation/validation';
import { UserValidation } from '../validation/user-validation';
import { ResponseError } from '../error/response-error';
import { prismaClient } from '../application/database';
import jwt from 'jsonwebtoken'; 
import { env } from '../config/config'

export class UserService {
    
    static async register(request : CreateUserRequest) : Promise<UserResponse> {
        
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);
        
        if (request.password !== request.confPassword) {
            throw new ResponseError(400, 'Password and confirm password dont match!')
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await prismaClient.user.create({
            data: {
                name: registerRequest.name,
                email: registerRequest.email,
                password: registerRequest.password
            }
        })

        return toUserResponse(user);
    }

    static async login(request: LoginUserRequest) : Promise<UserResponse> {

        const loginRequest = Validation.validate(UserValidation.LOGIN,  request);

        let user = await prismaClient.user.findUnique({
            where: {
                email: loginRequest.email
            }
        });

        if (!user) {
            throw new ResponseError(401, "Email or password is wrong");
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordValid) {
            throw new ResponseError(401, "Email or password is wrong");
        }

        const email = user.email;
        const name = user.name;

        const accessToken = jwt.sign({ name, email }, env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({ name, email }, env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });


        user = await prismaClient.user.update({
            where: {
                email: loginRequest.email
            },
            data: {
                refresh_token: refreshToken
            }
        });

        const response = toUserResponseLogin(user, accessToken!);
        response.refresh_token = refreshToken!;
        return response;
    }

    static async get(email: string ): Promise<UserResponse> {

        let user = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new ResponseError(401, "Email or password is wrong");
        }

        return toUserResponse(user);
    }

    static async logout(refresh_token: string): Promise<UserResponse> {
        
        const user = await prismaClient.user.findFirst({
            where: {
                refresh_token: refresh_token
            }
        });

        if (!user) {
            throw new ResponseError(403, "Not allow access!");
        }

        const result = await prismaClient.user.update({
            where: {
                email: user.email
            },
            data: {
                refresh_token: null
            }
        })


        return toUserResponse(result);
    }

    static async refreshToken(refreshToken: string) : Promise<UserResponse> {

        const user = await prismaClient.user.findFirst({
            where: {
                refresh_token: refreshToken
            }
        });

        if (!user) {
            throw new ResponseError(403, "Not allow access!");
        }


        try {
            const decoded = await new Promise((resolve, reject) => {
                jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(decoded);
                });
            });

            const name = user.name;
            const email = user.email;
            const accessToken = jwt.sign({ name, email }, env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });

            const response = toUserResponseLogin(user, accessToken);
            response.refresh_token = refreshToken;
            return response;

        } catch (err) {
            throw new ResponseError(403, "Not allowed access!"); 
        }
    }
}