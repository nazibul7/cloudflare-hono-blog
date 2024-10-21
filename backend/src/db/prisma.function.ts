import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

let prisma: any | null = null

export const getPrisma = (database_url: string) => {
    if (!prisma) {
        prisma = new PrismaClient({
            datasourceUrl: database_url
        }).$extends(withAccelerate())
        return prisma
    }
    return prisma
}