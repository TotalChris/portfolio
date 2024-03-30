import {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence} from 'firebase/auth'
import PageScaffold from '../components/PageScaffold';
import { AuthContext } from '../context/AuthProvider';
import Loading from '../components/Loading';
const LogIn = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const {currentUser, authLoaded} = useContext(AuthContext)

    const {email, password} = formData;

    useEffect(() => {
        if(authLoaded && currentUser){
            if(location.pathname !== '/log-in'){
                navigate(location.pathname)
            } else {
                navigate('/');
            }
        }
    }, [authLoaded, currentUser])

    const handleChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        setLoading(true);
        try{
            const auth = getAuth();
            await setPersistence(auth, browserLocalPersistence)
            await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
        } catch(e) {
            setLoading(false);
            console.log(e);
            setError(true);
        }
    }

    return (
        <PageScaffold>
            <h1 className='text-5xl'>Admin Login</h1>
            <form className={ 'w-full collapse ' + (error ? 'collapse-open' : '') } onSubmit={handleSubmit}>
                <div className='flex flex-wrap mt-10' style={{gap: '8px'}} >
                    <div className="flex sm:flex-row flex-col gap-4 items-stretch w-full">
                        <div className="form-control grow">
                            <input type="email" id="email" value={email} onChange={handleChange} placeholder="User ID" className="input bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none focus:border-black focus:dark:border-white rounded-2xl" />
                        </div>
                        <div className="form-control grow">
                            <input type="password" id="password" value={password} onChange={handleChange} placeholder="Password" className="input bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none focus:border-black focus:dark:border-white rounded-2xl" />
                        </div>
                        <button className="btn-wire mr-auto">
                            { loading ? (
                                <Loading />
                            ) : (
                                "Log In"
                            )}
                        </button>
                    </div>
                </div>
                <div className='collapse-content text-red-700 my-4 px-0'>
                    there was an error with your information. try again.
                </div>
            </form>
        </PageScaffold>
    );
};

export default LogIn;