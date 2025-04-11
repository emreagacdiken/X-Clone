const Footer: React.FC = () => {
    return (
        <div className="fixed bottom-0 right-5 m-6">
            <div className="rounded-xl  flex-wrap">
                <div className="flex space-x-4 w-full">
                    <p className="text-white text-xs">Hizmet Şartları</p>
                    <p className="text-white text-xs">Gizlilik Politikası</p>
                    <p className="text-white text-xs">Çerez Politikası</p>
                </div>
                <div className="flex space-x-4 w-full mt-1">
                    <p className="text-white text-xs">Imprint</p>
                    <p className="text-white text-xs">Erişilebilirlik</p>
                    <p className="text-white text-xs">Reklam bilgisi</p>
                </div>
                <div className="flex space-x-4 w-full mt-1">               
                    <p className="text-white text-xs">Daha fazla ...</p>
                    <p className="text-white text-xs">© 2024 Buse & Emre</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;