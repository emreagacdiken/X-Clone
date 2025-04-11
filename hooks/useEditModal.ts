import { create } from "zustand";

// Zustand, React uygulamalarında kullanılan bir durum yönetim kütüphanesidir ve global state yönetimi sağlar.

interface EditModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditModal = create<EditModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


export default useEditModal;