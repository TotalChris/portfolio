import React, {useEffect, useState} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const PrivateRoute = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        onAuthStateChanged(getAuth(), (user) => {
            if(user){
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        })
    })

    return (loggedIn ? <Outlet /> : <Navigate to='/log-in' />);
};

export default PrivateRoute;