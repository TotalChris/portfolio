import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import Notice from '../components/Notice';
const LogOut = () => {

    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            auth.signOut().then();
            navigate('/')
        }, 3000)
    }, [auth, navigate])

    return (
        <Notice
            title="Signing Out"
            message="You will be redirected..."
            link="Redirect Now"
            to="/"
        />
    );
};

export default LogOut;