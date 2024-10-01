import {Request, Response, NextFunction} from "express";
import {UserRequest} from "../type/user-request";
import jwt from "jsonwebtoken";
import { env } from "../config/config";


// export const someTokenVerificationFunction = (token: string): Promise<any> => {
//     return new Promise((resolve, reject) => {

//         const secretKey = env.ACCESS_TOKEN_SECRET as string;

//         jwt.verify(token, secretKey, (err, decoded) => {
//             if (err) {
//                 return reject(err); 
//             }
//             resolve(decoded); 
//         });
//     });
// };

// export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const authHeader = req.headers.authorization;
//         const token = authHeader && authHeader.split(' ')[1];

//         if (!token) {
//             res.status(401).json({ message: 'Unauthorized' });
//             return 
//         }

//         const decoded = await someTokenVerificationFunction(token);

//         req.email = decoded.email;

//         next();
//     } catch (error) {
//         res.status(403).json({ message: 'Forbidden' });
//     }
// };

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    }

    if (token) {
        jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403).end();
    
            if (decoded && typeof decoded === 'object' && 'email' in decoded) {
                req.email = (decoded as { email: string }).email;
                
                next();
                return 
            }
    
        })
    }

}