import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { useEffect } from "react";
import { BsTwitterX } from "react-icons/bs";
const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotofications = [] } = useNotifications(currentUser?.id);
// useEffect hook'u kullanılarak sayfa yüklendiğinde kullanıcının bildirimlerini çekmek için useNotifications hook'u kullanılır.
// Bildirimlerin çekilmesi için currentUser id'si kullanılır. 
  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotofications.length === 0) {
    return (
      <div
        className="
            text-neutral-600
            text-center
            p-6
            text-xl
        "
      >
        Bildirim yok
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {fetchedNotofications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="
                flex
                flex-row
                items-center
                p-6
                gap-4
                border-b-[1px]
                border-neutral-800

            "
        >
          <BsTwitterX color="white" size={32} />
          <p className="text-white">
            {notification.body}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;