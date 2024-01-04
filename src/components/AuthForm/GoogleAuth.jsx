import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, fireStore } from '../../firebase/firebase';
import useShowToast from '../../hooks/useShowToast';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import useAuthStore from '../../store/authStore';

function GoogleAuth({prefix}) {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state)=> state.user);
  const handleGoogleAuth = async() => {
    try {
      const newUser = await signInWithGoogle();
      if(!newUser && error){
        showToast("Error", "Invalid Credentials", "error");
        return;
      }
      const userRef = doc(fireStore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        // Login with Google
        const userDoc = userSnap.data();
        localStorage.setItem('user-info',userDoc);
        loginUser(userDoc);
      } else {
        // Sign up with Google
        const userDoc = {
          uid:newUser.user.uid,
          email: newUser.user.email,
          username:newUser.user.email.split("@")[0],
          fullName:newUser.user.displayName,
          bio:'',
          profilePicUrl:newUser.user.photoURL,
          followers:[],
          following:[],
          posts:[],
          createdAt:Date.now()
        }
        await setDoc(doc(fireStore, "users", newUser.user.uid), userDoc);
        localStorage.setItem('user-info',JSON.stringify(userDoc));
        loginUser(userDoc);
      }
      

    } catch (error) {
      
    }
  }

  return (
    <>
        <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth}>
            <Image src='/google.png' w={5} alt='Google Image'/>
            <Text mx={2} color={"blue.500"}>{prefix} with Google</Text>
        </Flex>
    </>
  )
}

export default GoogleAuth