import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
const LogOut = () => {

    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            auth.signOut().then();
            navigate('/log-in')
        }, 3000)
    }, [auth, navigate])

    return (
        <div className='mx-6 pt-24' style={{fontFamily: 'Roboto Mono'}}>
            <h1 className='text-6xl' >Signing Out</h1>
            <div className='w-full h-screen pt-6'>
                <p className='font-bold'>you will be redirected...</p>
            </div>
        </div>
    );
};

export default LogOut;