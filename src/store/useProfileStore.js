import {create} from 'zustand';

const useProfileStore = create((set)=> ({
    userProfile:null,
    setUserProfile:(userProfile)=> set({userProfile}),
    // addPost:
}))

export default useProfileStore;