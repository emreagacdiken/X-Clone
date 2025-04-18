import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

//Eğer istek POST metodu ile geldiyse, gönderiyi beğenen kullanıcıları güncelliyoruz.
//Eğer istek DELETE metodu ile geldiyse, gönderiyi beğenen kullanıcıları güncelliyoruz.
//Bu API endpointi, gönderilerin beğenilmesi için kullanılır.
//Bu endpointe sadece POST ve DELETE metodu ile istek atılabilir ve sadece giriş yapmış kullanıcılar erişebilir.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;

    const { currentUser } = await serverAuth(req,res);

    if (!postId || typeof postId !== "string") {
      throw new Error("Geçersiz ID");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Geçersiz ID");
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    if (req.method === "POST") {
      updatedLikedIds.push(currentUser.id);

      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        }); 
        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: "Birisi gönderini beğendi!",
              userId: post.userId,
            },
          });
        }

        await prisma.user.update({
          where: {
            id: post?.userId
          },
          data: {
            hasNotification: true
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
    if (req.method === "DELETE") {
      updatedLikedIds = updatedLikedIds.filter(
        (likeId) => likeId !== currentUser.id
      );
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}