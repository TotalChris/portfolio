import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {getAuth} from "firebase/auth";

const PrivateRoute = () => {
    return (getAuth().currentUser ? <Outlet /> : <Navigate to='/log-in' />);
};

export default PrivateRoute;