import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
    userId?: string;
}
// userId prop'unun değerine göre kullanıcının paylaşımlarını gösterdik.
// usePosts hook'unu kullanarak kullanıcının paylaşımlarını çektik.
// Çekilen paylaşımları map fonksiyonu ile PostItem bileşenine gönderdik.

const PostFeed: React.FC<PostFeedProps> = ({ userId}) => {
    const { data: posts = []} = usePosts(userId);
    return (
        <>
            {posts.map((post: Record<string, any>) => (
                <PostItem
                    userId={userId}
                    key={post.id}
                    data={post}
                />
            ))}
        </>
    )
}

export default PostFeed;