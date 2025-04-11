import UseSWR from 'swr';
import fetcher from '@/libs/fetcher';

//Hooklar, React uygulamalarında state ve lifecycle özelliklerini kullanmanızı sağlar.
// state ve lifecycle özellikleri, React uygulamalarında componentlerin 
//durumlarını ve yaşam döngülerini yönetmek için kullanılan özelliklerdir. 
//Önceden sadece class componentlerde kullanılabilen state ve lifecycle özelliklerini
// React 16.8 sürümü ile birlikte fonksiyon componentlerde de kullanmamıza olanak sağlar.
//useSWR ise verileri getirirken ve güncellerken kullanılan bir React hook'udur.
//fetcher fonksiyonu, verileri getirirken kullanılan bir fonksiyondur. çünkü useSWR, verileri getirirken fetch fonksiyonunu kullanır.

const useCurrentUser = () => {
  const { data, error,isLoading,mutate } = UseSWR('/api/current', fetcher);
  return {
    data,
    error,
    isLoading,
    mutate
  };
};


export default useCurrentUser;
