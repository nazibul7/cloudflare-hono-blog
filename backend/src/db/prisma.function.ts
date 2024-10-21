import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

type ExtendedPrismaClient = PrismaClient & ReturnType<typeof withAccelerate>;

let prisma: PrismaClient | null = null

export const getPrisma = (database_url: string):PrismaClient => {
    if (!prisma) {
        prisma = new PrismaClient({
            datasourceUrl: database_url
        }).$extends(withAccelerate()) as unknown as PrismaClient
        return prisma
    }
    return prisma
}


// Type Casting:

// The extended Prisma client with withAccelerate causes a type mismatch because the type returned by $extends doesn't match the base PrismaClient. To resolve this, we explicitly cast the extended client back to PrismaClient.
// The key here is using as unknown as PrismaClient. First, we cast to unknown, then to PrismaClient to bypass the type conflict safely.
// Singleton Pattern:

// The singleton pattern is preserved. The PrismaClient instance is created once, and subsequent calls return the same instance.