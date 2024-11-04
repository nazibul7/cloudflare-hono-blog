import { Hono } from 'hono';
import { setCookie } from "hono/cookie"
import { getPrisma } from '../db/prisma.function';
import { createToken } from '../utils/createToken';
import z, { ZodError } from "zod"
import { Bindings } from '../utils/types';
import bcrypt from "bcryptjs"
import { verifyToken } from '../middlewares/verifyToken';

const auth = new Hono<{ Bindings: Bindings }>();

const AuthSchema = z.object({
    email: z.string().email("Email is required"),
    password: z.string().min(1, "Password is required")
})
//Signup route
auth.post('/signup', async (c) => {
    try {
        const jsonData = await c.req.json()
        const data = AuthSchema.parse(jsonData)
        const prisma = getPrisma(c.env.DATABASE_URL)
        const existingUser = await prisma.user.findFirst({
            where: {
                email: data.email
            }
        })
        if (existingUser) {
            return c.text("User already exist")
        }
        const tokenGenerate = await createToken(c, data)
        const hashPassword = await bcrypt.hash(data.password, 10)
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashPassword,
                token: tokenGenerate
            }
        })
        setCookie(c, 'token', tokenGenerate, {
            httpOnly: true,
            secure: true,
            path: '/',
            sameSite: "Strict",
            maxAge: 24 * 24 * 60
        })
        const { password, token, ...remainingUaserData } = user
        return c.json(remainingUaserData, 200)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json({ message: "Validation error", details: error.errors[0].message }, 400);
        } else {
            return c.json("Something went wrong while creating user", 500);
        }
    }
});

//Signin route

auth.post('/signin', async (c) => {
    try {
        const jsonData = await c.req.json()
        const data = AuthSchema.parse(jsonData)
        const prisma = getPrisma(c.env.DATABASE_URL)
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        })
        if (!existingUser) {
            return c.json("User not found, need to signin", 404)
        }
        if (data.email !== existingUser.email) {
            return c.json("Wrong email or User is not registered", 400)
        }
        const passwordMatch = await bcrypt.compare(data.password, existingUser.password)
        if (!passwordMatch) {
            return c.json("Password does not match", 403)
        }
        const tokenGenerate = await createToken(c, existingUser)
        setCookie(c, 'token', tokenGenerate, {
            httpOnly: true,
            secure: true,
            path: '/',
            sameSite: "Strict",
            maxAge: 24 * 24 * 60
        })
        const { password, token, ...remainingUserData } = existingUser
        return c.json({ message: "SignIn successfull", remainingUserData }, 200)

    } catch (error) {
        if (error instanceof ZodError) {
            return c.json({ message: "Validation error", details: error.errors[0].message }, 400);
        } else {
            return c.json("Something went wrong while login user", 500);
        }
    }
})

// User route

auth.get('/', verifyToken, async (c) => {
    try {
        const data = c.req.user as string
        const prisma = getPrisma(c.env.DATABASE_URL)
        const user = await prisma.user.findUnique({
            where: { email: data }
        })
        if(!user){
            return c.json("User not found",404)
        }
        const {password,token,...restUserData}=user
        return c.json(restUserData,200)
    } catch (error) {
        return c.json("Something went wronmg",500)
    }
})
export default auth;
