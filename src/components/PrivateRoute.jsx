import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import LogIn from "../pages/LogIn";

const PrivateRoute = () => {

    const { currentUser } = useContext(AuthContext);

    return (currentUser ? <Outlet /> : <LogIn />)
};

export default PrivateRoute;