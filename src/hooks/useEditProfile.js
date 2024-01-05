import React, { useState } from 'react'
import useAuthStore from '../store/authStore'
import useShowToast from './useShowToast';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { fireStore, storage } from '../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import useProfileStore from '../store/useProfileStore';

function useEditProfile() {
    const authUser = useAuthStore((state)=> state.user);
    const [isUpdating, setIsUpdating] = useState(false);
    const showToast = useShowToast();
    const setAuthUser = useAuthStore((state)=> state.setUser);
    const setUserProfile = useProfileStore((state)=> state.setUserProfile);

    const editProfile = async(inputs, selectedFile) => {
        if(isUpdating && !authUser) return;
        setIsUpdating(true);

        // Create Storage for profile pics for every userId
        const storageRef = ref(storage, `profilePics/${authUser.uid}`);
        const userDocRef = doc(fireStore, 'users', authUser.uid);
        
        let URL = "";

        try {
            if(selectedFile){
                await uploadString(storageRef, selectedFile, 'data_url');
                URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}` ));
            }
            
        } catch (error) {
            showToast("Error", error.message, "error");
        }

        const updatedUser = {
            ...authUser,
            fullName: inputs.fullName || authUser.fullName,
            username: inputs.username || authUser.username,
            bio: inputs.bio || authUser.bio,
            profilePicUrl: URL || authUser.profilePicUrl
        }

        await updateDoc(userDocRef, updatedUser);
        localStorage.setItem('user-info', JSON.stringify(updatedUser));
        setAuthUser(updatedUser);
        setUserProfile(updatedUser);
        showToast("Success", "Profile updated Successfully", "success");
    }

  return {editProfile, isUpdating}
}

export default useEditProfile