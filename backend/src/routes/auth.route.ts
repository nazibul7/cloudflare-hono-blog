import { Hono } from 'hono';
import { getPrisma } from '../db/prisma.function';
import { createToken } from '../utils/createToken';
const auth = new Hono<{
    Bindings: {
        JWT_SECRET_KEY: any;
        DATABASE_URL: string
    }
}>();


auth.post('/signup', async (c) => {
    try {
        const data = await c.req.json()
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
        return c.json("Something went wrong while creating user",500)
    }
});

export default auth;
