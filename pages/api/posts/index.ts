import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

// post oluşturma ve postları getirme işlemlerini gerçekleştirir.
// post oluştururken kullanıcı kimliği alınır ve post oluşturulur.

export default async function handler( 
  // handler, bir API rotasının işlevini tanımlar ve asenkron işlemleri yönetir.

  req: NextApiRequest, // req, API rotasına gelen isteği temsil eder.
  res: NextApiResponse // res, API rotasından dönen yanıtı temsil eder.
) {
  if (req.method !== "POST" && req.method !== "GET") { 
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") { 
      const { currentUser } = await serverAuth(req,res); // serverAuth fonksiyonu ile kullanıcı kimliği doğrulanır.

      const { body } = req.body;

      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id,
        },
      });
      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      let posts;

      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({ // postlar getirilir.
          where: {
            userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }
      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}