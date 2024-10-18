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
        const x=await createToken(c, data)
        console.log(x);
        
        return c.text("Hello")
    } catch (error) {
        console.log(error);
    }
});

export default auth;
