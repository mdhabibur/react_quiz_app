import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/app";


const AuthContext = createContext()

const auth = getAuth(app)
//Auth Provider component
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)

    const signup = async (name, email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const userProfile = await updateProfile(userCredential.user, {
            displayName: name
        })
        setCurrentUser(userCredential.user)
        return userCredential
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)

    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
        return unsubscribe //cleanup subscription on unmount
    }, [])

    const values = {
        currentUser: currentUser,
        signup,
        signIn,
        logOut
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )



}

//to get the AuthContext
export const useAuth = () => {
    return useContext(AuthContext)
}
