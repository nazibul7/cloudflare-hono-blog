import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { JWTPayload } from "hono/utils/jwt/types";
import jwt from "jsonwebtoken"

export const verifyToken = async (c: Context, next: Next) => {
    try {
        const token = c.req.header('Authorization') || getCookie(c, "token")
        if (!token) {
            return c.json("No cookie found", 404)
        }
        const key = c.env.JWT_SECRET_KEY
        const decode = jwt.verify(token, key) as JWTPayload

        if (!decode.email) {
            return c.json("Invalid access token", 401)
        }
        c.req.user = decode.email as string
        await next()
    } catch (error) {
        return c.json("Authentication error", 403)
    }
}