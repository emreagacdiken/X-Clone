import Header from '../components/Header'
import Form from '../components/Form'
import PostFeed from '../components/posts/PostFeed'
import Footer from '../components/Footer'

//Bu dosya, uygulamanın anasayfasını oluşturur.

//Header bileşeni, sayfanın üst kısmında bulunan başlık bileşenidir.
//Form bileşeni, kullanıcıya gönderi yapma imkanı sunar.
//PostFeed bileşeni, kullanıcıların gönderilerini listeler.
//Footer bileşeni, sayfanın alt kısmında bulunan footer bileşenidir.

export default function Home() {
  return (
  <>
  <Header label="Sana özel" />
  <Form placeholder="Neler oluyor?" />
  <PostFeed />
  <Footer />
  </>
  )
}
