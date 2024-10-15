import { Hono } from 'hono';
import { getPrisma } from './prisma.function';
const auth = new Hono<{
    Bindings:{
        DATABASE_URL:string
    }
}>();


auth.post('/signup', async (c) => {
    try {
        const data = await c.req.json()
        console.log(data);
        
        const existingUser = await getPrisma(c.env.DATABASE_URL).user.findFirst({
            where: {
                email: data.email
            }
        })
        if (!existingUser) {
            return c.text("No user found")
        }

        return c.text("Hello")
    } catch (error) {
        console.log(error);
    }
});

export default auth;
