import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

// UserView, kullanıcı bilgilerini gösterir ve PostFeed ile kullanıcının gönderilerini listeler.
//useUser hook'u ile userId değeri ile kullanıcı verilerini getirir.
//Eğer veri yüklenirken, yani isLoading true iken, kullanıcıya bir yükleniyor animasyonu gösterilir.
//Son olarak, PostFeed componenti ile kullanıcının gönderileri listelenir.

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <>
      <Header label={fetchedUser?.name} showBackArrow />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserView;