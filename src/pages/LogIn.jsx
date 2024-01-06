import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence} from 'firebase/auth'
const LogIn = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState(false);

    const {email, password} = formData;

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
        try{
            const auth = getAuth();
            await setPersistence(auth, browserLocalPersistence)
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential.user) {
                navigate('/');
            }
        } catch(e) {
            console.log(e);
            setError(true);
        }
    }

    return (
        <div className='pt-24 px-8 min-h-screen mx-auto' style={{fontFamily: 'Roboto Mono', maxWidth: '1080px'}}>
            <h1 className='text-6xl'>Admin Login</h1>
            <form className={ 'w-full collapse ' + (error ? 'collapse-open' : '') } onSubmit={handleSubmit}>
                <div className='flex flex-wrap mt-10' style={{gap: '8px'}} >
                    <div className="flex sm:flex-row flex-col gap-4 items-stretch w-full">
                        <div className="form-control grow">
                            <input type="email" id="email" value={email} onChange={handleChange} placeholder="User ID" className="input input-bordered bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none focus:border-black focus:dark:border-white" />
                        </div>
                        <div className="form-control grow">
                            <input type="password" id="password" value={password} onChange={handleChange} placeholder="Password" className="input input-bordered bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none focus:border-black focus:dark:border-white" />
                        </div>
                        <button className="btn btn-primary dark:text-black dark:bg-white dark:hover:text-black dark:hover:bg-white mr-auto rounded-xl border-none">Log In</button>
                    </div>
                </div>
                <div className='collapse-content text-red-700 my-4 px-0'>
                    there was an error with your information. try again.
                </div>
            </form>
        </div>
    );
};

export default LogIn;