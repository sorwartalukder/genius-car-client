import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../../firebase/firebase.config'

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const userLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const userLoginGoogle = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const updateUser = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }
    const logOut = () => {
        localStorage.removeItem('genius-token')
        return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser => {
            setUser(currentUser)
            setLoading(false)
        }))
        return () => unsubscribe();
    }, [])
    const authInfo = { user, loading, createUser, userLogin, userLoginGoogle, updateUser, logOut }
    return (

        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;