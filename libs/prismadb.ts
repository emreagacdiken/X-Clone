import { PrismaClient } from "@prisma/client";

// PrismaClient nesnesini oluşturur ve global nesneye atar.
// Bu sayede, her request'te yeni bir PrismaClient nesnesi oluşturulduğundan memory leak problemleri önlenir.
// Memory leak, bir programın çalışması sırasında kullanılan bellek alanlarının serbest bırakılmaması durumudur.

declare global {
    var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV != "production") {
    globalThis.prisma = client;
}


export default client;