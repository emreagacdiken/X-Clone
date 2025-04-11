import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

//Gelen istek body'sinden name, username, bio, profileImage ve coverImage değerlerini alıyoruz.
//Eğer name veya username değeri yoksa, hata döndürüyoruz çünkü diğerleri opsiyonel.
//Prisma kullanarak, currentUser.id değerine sahip kullanıcıyı güncelleyip döndürüyoruz.
//Bu API endpointi, kullanıcı bilgilerini güncellemek için kullanılır.
//Bu endpointe sadece PATCH metodu ile istek atılabilir ve sadece giriş yapmış kullanıcılar erişebilir.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req,res);

    const { name, username, bio, profileImage, coverImage } = req.body;

    if (!name || !username) {
      throw new Error("İşlem başarısız!");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}