import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import {SessionProvider} from 'next-auth/react'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import EditModal from '@/components/modals/EditModal'

//Bu dosya, uygulamanın genelinde kullanılan bileşenleri içerir.

//SessionProvider bileşeni, kullanıcı oturumunu yönetir.
//Toaster bileşeni, uygulama içinde kullanıcıya bildirim göstermek için kullanılır.
//Layout bileşeni, uygulamanın genel yapısını oluşturur.
//LoginModal, RegisterModal ve EditModal bileşenleri, kullanıcı girişi, üye olması ve düzenlemesi için modeller oluşturur.

export default function App({ Component, pageProps }: AppProps) {
  return ( 
    <SessionProvider session={pageProps.session}>
    <Toaster />
    <EditModal />
    <RegisterModal />
    <LoginModal />
    <Layout>
    <Component {...pageProps} />
  </Layout>
    </SessionProvider>
  )
}