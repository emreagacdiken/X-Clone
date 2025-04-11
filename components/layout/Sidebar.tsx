import { BsHouseFill, BsBellFill, BsTwitterX, BsSearch, BsEnvelopeFill, BsThreeDots, BsSlashSquare, BsPeople, BsLightning } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';
import { BiLogOut } from 'react-icons/bi';
import useCurrentUser  from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
    const {data: currentUser} = useCurrentUser();
// SidebarItem bileşenine props olarak gönderdiğimiz auth ve alert değerlerini 
// kullanarak kullanıcının giriş yapmış olup olmadığını kontrol ettik.
    const items = [
        {
        label: 'Anasayfa',
        href: '/',
        icon: BsHouseFill
        },
        {
        label: 'Keşfet',
        href: '/',
        icon: BsSearch
        },
        {
        label: 'Bildirimler',
        href: '/notifications',
        icon: BsBellFill,
        auth: true,
        alert: currentUser?.hasNotification
        },
        {
        label: 'Mesajlar',
        href: '/',
        icon: BsEnvelopeFill
        },
        {
        label: 'Grok',
        href: '/',
        icon: BsSlashSquare
        },
        {
        label: 'Topluluklar',
        href: '/',
        icon: BsPeople
        },
        {
        label: 'Premium',
        href: '/',
        icon: BsTwitterX
        },
        {
            label: 'Onaylı Kuruluşlar',
            href: '/',
            icon: BsLightning
            },
        {
            label: "Profil",
            href: `/users/${currentUser?.id}`,
            icon: FaUser,
            auth: true,
        },
      
        {
        label: 'Daha Fazla',
        href: '/',
        icon: BsThreeDots
        }
    ];
    return(
        <div className="col-span-1 h-full pr-4 md:pr6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                <SidebarLogo /> 
                {items.map((item) => (
                    <SidebarItem 
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    auth={item.auth}
                    alert={item.alert}
                    />
                ))}
                {currentUser &&(
                <SidebarItem onClick={() => signOut()} label="Çıkış Yap" icon={BiLogOut} /> 
                )}
                <SidebarTweetButton />        
                </div>
            </div>
        </div>
    );
}

export default Sidebar;