import { NextApiRequest, NextApiResponse } from "next"; // Next.js API rotaları için gerekli olan modüller

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/libs/prismadb"; // Prisma veritabanı bağlantısı


import { getServerSession } from "next-auth"; // Next.js sunucu oturum yönetimi modülü

// Bir API rotasında kullanıcı kimliğini doğrulamak için kullanılır.
// devamında kullanıcı kimliğini veritabanından alır ve döndürür. sonrasında bu kimliği kullanarak işlemler yapılır. 

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => { 
  const session = await getServerSession(req, res, authOptions); // Oturumu alır
  
  if (!session?.user?.email) { 
    throw new Error("Giriş yapılamadı!");
  }

  const currentUser = await prisma.user.findUnique({ 
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Giriş yapılamadı!");
  }

  return { currentUser };
};

export default serverAuth; 