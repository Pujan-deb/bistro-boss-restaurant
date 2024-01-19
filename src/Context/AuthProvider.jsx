import { createContext, useState } from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import app from "../Firebase/firebase.init";
import { useEffect } from "react";

import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);
export const Authinfo = createContext(null)

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currenuser) => {
            setUser(currenuser)

            if (currenuser) {
                axios.post("http://localhost:5000/jwt", { email: currenuser.email })
                    .then(data => {
                        localStorage.setItem("access-token", data.data.token)
                        setLoading(false)
                    })
            } else {
                localStorage.removeItem("access-token")
            }
        })
        return () => {
            unsubscribe()
        }

    }, [])
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const Registration = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass);
    }
    const updatename = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }
    const passwordReset = () => {
        return sendPasswordResetEmail(auth, user?.email)
            .then(() => {
                console.log("password reseted successfully")
            })
            .catch((error) => {
                console.log(error.message)
            });
    }
    const logout = () => {
        return signOut(auth).then(() => { }).catch(() => { })
    }
    const userinfo = { signInWithGoogle, passwordReset, Registration, updatename, login, logout, user, loading }
    return (
        <Authinfo.Provider value={userinfo}>
            {children}
        </Authinfo.Provider>
    )
}
