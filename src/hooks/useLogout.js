import React from 'react'
import { auth } from '../firebase/firebase';
import { useSignOut } from 'react-firebase-hooks/auth';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';

function useLogout() {
    const [signOut, isLoggingOut, error] = useSignOut(auth);
    const showToast = useShowToast();
    const logout = useAuthStore((state)=> state.logout);
    const handleLogout = async() => {
        try {
            await signOut();
            localStorage.removeItem('user-info');
            logout();
        } catch (error) {
            showToast("Error", error.message, 'error')
        }
    }
  return {handleLogout,isLoggingOut,error}
}

export default useLogout