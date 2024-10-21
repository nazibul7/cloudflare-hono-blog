import { Hono } from 'hono';
import { getPrisma } from '../db/prisma.function';
import { createToken } from '../utils/createToken';
import z from "zod"
const auth = new Hono<{
    Bindings: {
        JWT_SECRET_KEY: any;
        DATABASE_URL: string
    }
}>();

const AuthSchema=z.object({
    email:z.string().email("Email is required"),
    password:z.string().min(1,"Password is required")
})
//Signup route
auth.post('/signup', async (c) => {
    try {
        const jsonData =await c.req.json()
        const data=AuthSchema.parse(jsonData)
        const prisma = getPrisma(c.env.DATABASE_URL)
        const existingUser = await prisma.user.findFirst({
            where: {
                email: data.email
            }
        })
        if (existingUser) {
            return c.text("User already exist")
        }
        const token=await createToken(c, data)
        const user=await prisma.user.create({
            data:{
                email:data.email,
                password:data.password,
                token
            }
        })
        return c.json(user,200)
    } catch (error) {
            if (error instanceof z.ZodError) {
                return c.json({ message: "Validation error", details: error.errors[1].message }, 400);
            } else {
                return c.json("Something went wrong while creating user", 500);
            }
    }
});

export default auth;
