import React, { useEffect, useState } from 'react'
import useProfileStore from '../store/useProfileStore';
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { fireStore } from '../firebase/firebase';

function useFollowUser(userId) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const {userProfile, setUserProfile} = useProfileStore();
    const authUser = useAuthStore((state)=> state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const showToast = useShowToast()

    const handleFollowUser = async() => {
        setIsUpdating(true);
        try {
            const currentUserRef =  doc(fireStore, "users", authUser.uid);
            const userToFollowOrUnfollowRef =  doc(fireStore, "users", userId);

            // For Current User update database
            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
            })

            // Updates value for Profile user
            await updateDoc(userToFollowOrUnfollowRef, {
                followers : isFollowing ? arrayRemove(authUser.uid) : arrayUnion(userId)
            })

            if(isFollowing) {

                // Unfollow that user
                setAuthUser({
                    ...authUser,
                    following: authUser.following.filter(uid => uid !== userId)
                })
                setUserProfile({
                    ...userProfile,
                    followers: userProfile.followers.filter(uid=> uid !== authUser.uid)
                })

                localStorage.setItem('user-info', JSON.stringify({
                    ...authUser,
                    following: authUser.following.filter(uid => uid !== userId)
                }))
                setIsFollowing(false);
            } else {
                // Increse the following for auth user and followers for Profile User
                setAuthUser({
                    ...authUser,
                    following: [...authUser.following, userId]
                }) 

                setUserProfile({
                    ...userProfile,
                    followers: [...userProfile.followers, authUser.uid]
                })
                localStorage.setItem('user-info', JSON.stringify({
                    ...authUser,
                    following: [...authUser.following, userId]
                }))
                setIsFollowing(true);
            }

        } catch (error) {
            showToast("Error", error.message, "error");
        }
        finally {
            setIsUpdating(false);
        }
    }

    useEffect(()=>{
        if(authUser){
            // Check if authenticated user is following that profile user or not
            console.log(authUser.following);
            console.log("userId: ", userId);
            const isFollowing = authUser.following.includes(userId);
            console.log("isFollowing ", isFollowing);
            setIsFollowing(isFollowing)
        }

    },[userId, authUser])

  return {isUpdating, isFollowing, handleFollowUser}
}

export default useFollowUser