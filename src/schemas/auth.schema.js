import {z} from 'zod';

export const registerSchema = z.object({

    username : z.string({
        required_error: 'Usuario requerido.',
    }),
    email: z.string({
        required_error: 'Email requerido.',
    }).email({
        message: 'Email no valido',
    }),
    password: z.string({
        required_error: "Contraseña requerida",
    })
    .min(6, {
        message: "La constraseña necesita 6 caracteres minimo.",
    }),
});

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email es requerido.",
    }).email({
        message: "Email invalido.",
    }),
    password: z.string({
        required_error: "Se necesita una constraseña",
    }).min(6, {
        message: "La constraseña necesita 6 caracteres minimo.",
    }),
});