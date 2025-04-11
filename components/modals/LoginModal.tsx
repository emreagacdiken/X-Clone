import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback , useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import { signIn } from "next-auth/react";

// Giriş yapmak için kullanılan model , e-posta ve şifre girilir ve giriş yapılır 
const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal= useRegisterModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onToggle = useCallback(() => {
        if(loading){
            return;
        }
        loginModal.onClose();
        registerModal.onOpen();},[loading, registerModal, loginModal]);

    const onSubmit= useCallback(async () => {
        try{
            setLoading(true);

            await signIn('credentials', {
                email,
                password});

            loginModal.onClose();}
            catch(error) {
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        },[loginModal, email, password]);

        const bodyContent = (
            <div className="flex flex-col gap-4" 
            >
                <Input
                placeholder="E-posta"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={loading}
                
                />
                <Input 
                placeholder="Şifre"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={loading} /> </div>)

                const footerContent = (
                    <div className= "text-neutral-400 text-center mt-4">
                        <p>İlk defa mı X kullanıyorsun?
                            <span
                            onClick={onToggle}
                            className="
                            text-white
                            cursor-pointer
                            hover:underline"
                            > Hesap oluştur</span>
                        </p>
                    </div> );

    return(
        <Modal
        disabled={loading}
        isOpen={loginModal.isOpen}
        title="Giriş Yap"
        actionLabel="Giriş Yap"
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body= {bodyContent}
        footer={footerContent}
        />
    );}

export default LoginModal;