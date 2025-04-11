import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback , useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import axios from "axios";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";

// Üye olmak için olan model , e-posta isim şifre girilir ve üye olunur
const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal= useRegisterModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setname] = useState('');
    const [username,setusername] = useState('');
    const [loading, setLoading] = useState(false);

    const onToggle = useCallback(() => {
        if(loading){
            return;
        }
        registerModal.onClose();
        loginModal.onOpen();},[loading, loginModal, registerModal]);

    const onSubmit= useCallback(async () => {
        try{
            setLoading(true);

            await axios.post('/api/register',{
                email,
                password,
                username,
                name,
            });

            toast.success('Hesap oluşturuldu!');

            signIn('credentials', {
                email,
                password,
            });

            registerModal.onClose();}
            catch(error) {
                console.log(error);
                toast.error('Bir şeyler yanlış gitti!');
            }
            finally{
                setLoading(false);
            }
        },[registerModal, email, password, username, name]);

        const bodyContent = (
            <div className="flex flex-col gap-4">
                <Input 
                placeholder="E-posta"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={loading} />
                <Input 
                placeholder="İsim"
                onChange={(e) => setname(e.target.value)}
                value={name}
                disabled={loading} />
                <Input 
                placeholder="Kullanıcı adı"
                onChange={(e) => setusername(e.target.value)}
                value={username}
                disabled={loading} />
                <Input 
                placeholder="Şifre"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={loading} /> </div>)
            
                const footerContent = (
                    <div className= "text-neutral-400 text-center mt-4">
                        <p>Zaten bir hesabın var mı?
                            <span
                            onClick={onToggle}
                            className="
                            text-white
                            cursor-pointer
                            hover:underline"
                            > Giriş yap</span>
                        </p>
                    </div> );

    return(
        <Modal
        disabled={loading}
        isOpen={registerModal.isOpen}
        title="Hesap Oluştur"
        actionLabel="Üye Ol"
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body= {bodyContent}
        footer={footerContent}
        />
    );}

export default RegisterModal;