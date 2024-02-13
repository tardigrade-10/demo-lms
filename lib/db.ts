import {PrismaClient} from "@prisma/client";
declare global {
    var prisma: PrismaClient | undefined;
};
export const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = db; // if we are not in production i.e. in staging or development then we can use globalThis.prisma to assign our db and it is not affected by hot reload

//instead of line 2 to 6 we could also use 
//export const db = new PrismaClient();
//but it will cause issues in development as we are using hot reload which means that evertime we save a file it will create a new PrismaClient instance will be created which will overflow our project and our project will crash.
