'use client';

import { useEffect } from 'react';
import { useModalStore } from '@/store/modal-store';
import LoginModal from '@/components/modals/login-modal';
import RegisterModal from '@/components/modals/register-modal';
// import ManagerLoginModal from '@/components/modals/manager-login-modal';
// import ManagerRegisterModal from '@/components/modals/manager-register-modal';


export default function ModalProvider() {
  const { closeAllModals } = useModalStore();
  
  // Close all modals when the component unmounts (page navigation)
  useEffect(() => {
    return () => closeAllModals();
  }, []);
  
  return (
    <>
      <LoginModal />
      <RegisterModal />
      {/* <ManagerLoginModal />
      <ManagerRegisterModal /> */}
    </>
  );
}