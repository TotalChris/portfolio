import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import LogIn from "../pages/LogIn";
import Spinner from "./Loading";

const PrivateRoute = () => {

    const { currentUser, authLoaded } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(authLoaded){
            setLoading(false);
        }
    }, [authLoaded])

    if(loading){
        return <Spinner />
    }

    return (currentUser ? <Outlet /> : <LogIn />)
};

export default PrivateRoute;