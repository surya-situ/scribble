import { PrismaClient } from "@prisma/client";

const prismaClientSingleTon = () => {
    return new PrismaClient();
};

type prismaClientSingleTon = ReturnType<typeof prismaClientSingleTon>;

const globalForPrisma = globalThis as unknown as {
    prisma: prismaClientSingleTon | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleTon();

export default prisma;

if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;