import useUsers from "@/hooks/useUsers";
import Avatar from "../Avatar";
import Button from "../Button";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFollow from "@/hooks/useFollow";
import TopicBar from "./TopicBar";

const FollowBar = () => { 
  const { data: users = [] } = useUsers(); // Kullanıcıları almak için useUsers hook'unu kullandık.
  const { data: currentUser } = useCurrentUser(); // Kullanıcı bilgilerini almak için useCurrentUser hook'unu kullandık.
  const userId = currentUser?.id; 
  const { isFollowing, toggleFollow } = useFollow(userId); 
// toggleFollow fonksiyonu ile takip etme işlemini yaptık , isFollowing ise kullanıcının takip edilip edilmediğini kontrol eder.

  const topics = currentUser?.topics || [
    { title: "Balıkesir", subtitle: "Türkiye tarihinde gündemde", posts: "10,5B Gönderi" },
    { title: "#React", subtitle: "Teknolojide gündemde", posts: "334 Gönderi" },
    { title: "Çaycı Hüseyin Öldü Mü?", subtitle: "Sinema ve televizyon · Gündemdekiler", posts: "55,5B Gönderi" },
    { title: "#Bitcoin", subtitle: "İş dünyası ve finans · Gündemdekiler", posts: "104,8B Gönderi" },
    { title: "Yaprak Sarma", subtitle: "Türkiye tarihinde gündemde", posts: "1.907 Gönderi" },
];

  if (users.length === 0) {
    return null;
}

return ( 
    <div className="fixed bottom-20 right-3 m-6">
        <div className="bg-neutral-800 rounded-xl p-4">
            <h2 className="text-white font-semibold text-xl">Kimi takip etmeli</h2>
            <div className="flex flex-col mt-4 gap-6">
                {users.map((user: Record<string, any>) => (
                    <div key={user.id} className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center justify-center">
                            <Avatar userId={user.id} />
                            <div className="flex flex-col ml-4">
                                <p className="text-white font-semibold text-sm">{user.name}</p>
                                <p className="text-neutral-400 text-sm">@{user.username}</p>
                            </div>
                        </div>
                        <Button
                            onClick={toggleFollow}
                            label={isFollowing ? "Takip et" : "Takip et"}
                            secondary={!isFollowing}
                            outline={isFollowing}
                        />
                    </div>
                ))}
            </div>
        </div>
        <TopicBar topics={topics} />
    </div>
);

}

export default FollowBar;