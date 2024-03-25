import { useEffect, useState, createContext } from "react";
import { auth } from "../firebase.config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(undefined);
    const [authLoaded, setAuthLoaded] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(setCurrentUser);
        if(currentUser !== undefined){
            setAuthLoaded(true);
        }
    }, [currentUser])

    return (
        <AuthContext.Provider value={{currentUser, authLoaded}}>
            { children }
        </AuthContext.Provider>
    )
}