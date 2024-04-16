import { create } from "zustand";

type AuthModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useAuthModel = create<AuthModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useAuthModel;