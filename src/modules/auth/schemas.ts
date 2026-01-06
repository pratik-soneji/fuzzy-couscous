import z from 'zod';
export const registerSchema =  z.object({
    email: z.string().email(),
    password: z.string(),
    username: z.string()
    .min(3,"username must be of three charcters")
    .max(63,"username must be less than 63 characters")
    .regex(
        /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
        "Username only contain lowercase letters, numbers and hypthens. It must start and end with a letter or a number"
    )
    .refine(
        (val)=>(!val.includes("--")),
        "Username cannot contain consecutive hyphens"
    )
    .transform((val)=>val.toLowerCase())
})
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})