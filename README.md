# Instagram clone setup

# Firebase:
Create a file: firebase.js => connecting the Firebase with React app by installing the firebase package. use getAuth, getFirestore, getStorage function from package. export all this variable and we can use them for storage, authentication and database connectivity.

    1. Authenticate : 
        SignIn with Email and password
        SignIn with Google
    2. Store
    3. Firestore

# Zustand: 
Zustand is a state management library for React that allows you to manage state in a simple and intuitive way. It is built on top of the Context API and uses the concept of stores to manage state. A store is a container for a specific piece of state and any functions that modify that state.

# Global Files
    1. authStore.js -> create a store for authentication by seting up states such as user, setUser, login, logout
    2. useProfileStore.js -> create a store for profile by seting the states such as userProfile, setUserProfile

    #  Hooks
    1. useSignupWithEmail: uses react-firebase-hook package function useCreateUserWithEmailAndPassword for creating a new user in firebase.
    2. useLogout: uses useSignOut function from react-firebase-hook package which remove the authentication of user and update the authStore states[logout]  
    3. useLogin: calls the useSignInWithEmailAndPassword function that check the authentication of user. Updates the authStore by seting the login state

# Auth Page
Set up the Auth Page: contain the Image and form layout
    Create a isLogin state parameter whose current value is true[User will see login page initially]

    1. SignUp : isLogin:false
        1. show the input fields with signup button
        2. call useSignupWithEmail hook wich store the user data in Authentication, firestore database
        3. Create local storage and set the variable user-info with user data in json format
        4. set the authStore login state with user array

    2. Login: is Login:true 
        1. show input fields with signIn button
        2. call useLogin hook

    3. Google Authentication

    4. Logout : use useSignOut function from react-firebase-hook 

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# Profile Page
This page will always have page url as localhost:port/username => username will be unique param for every user
    -> Create a useGetProfileByUsername hook: will fetch profile data on basis of username
    -> craete UserProfileStore : will globally set user profile states
    -> edit profile functionality
        create editprofile modal
        create usePreviewImage hook to show the Image preview for selected image in file foramt
    





Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
