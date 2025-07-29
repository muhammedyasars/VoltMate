
import { create } from 'zustand';

interface ModalState {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isManagerLoginOpen: boolean;
  isManagerRegisterOpen: boolean;
  
  onOpen: (modal: 'login' | 'register' | 'managerLogin' | 'managerRegister') => void;
  onClose: () => void;
  closeAllModals: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isLoginOpen: false,
  isRegisterOpen: false,
  isManagerLoginOpen: false,
  isManagerRegisterOpen: false,
  
  onOpen: (modal) => set({
    isLoginOpen: modal === 'login',
    isRegisterOpen: modal === 'register',
    isManagerLoginOpen: modal === 'managerLogin',
    isManagerRegisterOpen: modal === 'managerRegister',
  }),
  
  onClose: () => set({
    isLoginOpen: false,
    isRegisterOpen: false,
    isManagerLoginOpen: false,
    isManagerRegisterOpen: false,
  }),
  
  closeAllModals: () => set({
    isLoginOpen: false,
    isRegisterOpen: false,
    isManagerLoginOpen: false,
    isManagerRegisterOpen: false,
  }),
}));