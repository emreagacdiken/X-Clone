import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Header from "@/components/Header";
import CommentFeed from "@/components/posts/CommentFeed";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

//ClipLoader, yükleniyor animasyonu için kullanılan bir kütüphanedir.

// PostView  bir gönderinin detaylarını gösterir ve Form ise kullanıcıya yorum yapma imkanı sunar.
// ve bu postId değeri ile usePost hook'unu kullanarak gönderi verilerini getirir. 
//Eğer veri yüklenirken, yani isLoading true iken, kullanıcıya bir yükleniyor animasyonu gösterilir.
//Son olarak, CommentFeed componenti ile gönderiye yapılan yorumlar gösterilir. 
//Bu component, yorumları göstermek için CommentItem componentini kullanır.

const PostView = () => {

    const router = useRouter();
    const { postId } = router.query;

    const { data: fetchedPost, isLoading} = usePost(postId as string);

    if(isLoading || !fetchedPost){
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    return (
        <>
            <Header label="Gönderi" showBackArrow />
            <PostItem data={fetchedPost} />
            <Form postId={postId as string} isComment placeholder="Gönderiyi yanıtla" />
            <CommentFeed comments={fetchedPost?.comments} />
            <Footer />
        </>
    )
}

export default PostView;