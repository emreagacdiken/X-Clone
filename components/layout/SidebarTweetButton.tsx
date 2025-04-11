import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { FaFeather } from 'react-icons/fa';
import useLoginModal from '@/hooks/useLoginModal';

const SidebarTweetButton = () => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const onClick= useCallback(() => { 
        loginModal.onOpen(); 
    },
        [loginModal]);

    return(  // Ekranın sol altındaki gönder butonu bileşenini oluşturduk.
        <div onClick={onClick}>
            <div
            className="
            mt-6
            lg:hidden
            rounded-full
            h-14
            w-14
            p-4
            flex
            items-center
            justify-center
            bg-white
            hover:bg-opacity-80
            transition
            cursor-pointer"
            > 
                <FaFeather size={24} color="black" /> 
            </div>
            <div
            className="
            mt-6
            hidden
            lg:block
            px-4
            py-2
            rounded-full
            bg-white
            hover:bg-opacity-90
            cursor-pointer
            transition">
                <p className="
            hidden
            lg:block
            text-center
            font-semibold
            text-black
            text-[20px]">
                    Gönder
                </p>
            </div>
        </div>
    );
}
export default SidebarTweetButton;