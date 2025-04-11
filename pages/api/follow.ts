import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

//Eğer istek POST metodu ile geldiyse, takip edilen kullanıcıya bildirim gönderiyoruz.
//Eğer istek DELETE metodu ile geldiyse, takip edilen kullanıcıyı takip etmeyi bırakıyoruz.
//Bu API endpointi, kullanıcıların birbirlerini takip etmesi için kullanılır.
//Bu endpointe sadece POST ve DELETE metodu ile istek atılabilir ve sadece giriş yapmış kullanıcılar erişebilir.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.body;

    const { currentUser } = await serverAuth(req,res);

    if (!userId || typeof userId !== "string") {
      throw new Error("Geçersiz ID");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userId) {
      throw new Error("Geçersiz ID");
    }

    let updatedFollowingIds = [...(user?.followingIds || [])];

    if (req.method === "POST") {
      updatedFollowingIds.push(userId);

      try {
        await prisma.notification.create({
          data: {
            body: "Birisi seni takip etmeye başladı!",
            userId: userId,
          },
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (req.method === "DELETE") {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}