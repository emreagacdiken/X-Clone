import axios from 'axios';

const fetcher =(url:string) => axios.get(url).then(res => res.data);

export default fetcher;

// fetcher fonksiyonu, verilen URL'ye bir GET isteği yapar ve gelen veriyi geri döndürür.
// bu fonksiyonu useSWR hook'unda verileri getirirken ve güncellerken kullanıyoruz.
