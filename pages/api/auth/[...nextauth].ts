import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prismadb";

//bcrypt kütüphanesi ile şifre kontrolü yapılır.
//next-auth, kimlik doğrulama ve oturum yönetimi işlemlerini kolaylaştıran bir kütüphanedir.
//credentials provider, kullanıcı adı ve şifre ile kimlik doğrulama sağlar.
//PrismaAdapter, prisma veritabanı işlemlerini next-auth ile kullanmamızı sağlar.
//jwt, json web token oluşturmak için kullanılır. Oturum yönetimini sağlar

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Geçersiz referans");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Geçersiz referans");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Geçersiz referans");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions); 


