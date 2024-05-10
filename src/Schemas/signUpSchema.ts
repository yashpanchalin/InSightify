import { use } from 'react';
import { PassThrough } from 'stream';
import {z} from 'zod';

export const userValidation = z
    .string()
    .min(5, "Username must be astleast 5 characters")
    .max(20, "Username must be atmost 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain any further special characters ")

export const signUpSchema = z.object({
    username : userValidation,
    email : z.string().email({message:"Invalid E-mail Address"}),
    password : z.string().min(6 ,{message:"Password must contain 6 Characters"})
})