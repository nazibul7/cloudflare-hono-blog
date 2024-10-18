import { Context } from "hono"
import jwt from "jsonwebtoken"
type PayloadType = {
    email: string,
    password: string
}
export const createToken = async (c: Context, payload: PayloadType) => {
    const key = c.env.JWT_SECRET_KEY
    const token = jwt.sign(payload, key, { expiresIn: "1h" })
    return token
}