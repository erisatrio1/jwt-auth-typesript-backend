import 'dotenv/config';

// declare global {
//     namespace NodeJS {
//       interface ProcessEnv {
//         [key: string]: string | undefined;
//         PORT: string;
//         ACCESS_TOKEN_SECRET: string  | undefined;
//         REFRESH_TOKEN_SECRET: string  | undefined;
//       }
//     }
//   }

// type Config = {
//     ACCESS_TOKEN_SECRET: string  | undefined;
//     REFRESH_TOKEN_SECRET: string  | undefined;
// }

// export const config : Config {
//     ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
//     REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
// }

// export default {
//     ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
//     REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
// }

import {z} from 'zod'

const envSchema = z.object({
    ACCESS_TOKEN_SECRET: z.string().min(1),
    REFRESH_TOKEN_SECRET: z.string().min(1),
    // PORT: z.number().min(1)
})

export const env = envSchema.parse(process.env)