import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import PageScaffold from '../components/PageScaffold';
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
        <PageScaffold>
            <h1 className='text-5xl' >Signing Out</h1>
            <div className='w-full h-screen pt-6'>
                <p className='font-bold'>you will be redirected...</p>
            </div>
        </PageScaffold>
    );
};

export default LogOut;