import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

//Bu dosya, kullanıcının bildirimlerini gösterir.

//nextpagecontext, next.js'in sayfa içindeki verilere erişmek için kullandığı bir objedir.
//getSession, kullanıcının oturumunu kontrol etmek için kullanılır.
//Eğer kullanıcı oturumu yoksa, kullanıcıyı anasayfaya yönlendirir.

export async function getServerSideProps(context: NextPageContext){
    const session = await getSession(context);

    if(!session){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            session
        }
    }
}

const Notifications = () => {
    return (
        <>
            <Header label="Bildirimler" showBackArrow />
            <NotificationsFeed />
            <Footer />
        </>
    )
}

export default Notifications;