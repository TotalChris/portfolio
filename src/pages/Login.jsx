import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
const Login = () => {

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
        <div className='pt-24 mx-6 min-h-screen' style={{fontFamily: 'Roboto Mono'}}>
            <h1 className='text-6xl'>Admin Login</h1>
            <form className={ 'collapse ' + (error ? 'collapse-open' : '') } onSubmit={handleSubmit}>
                <div className='flex flex-wrap justify-start mt-10' style={{gap: '8px'}} >
                    <div className="form-control grow w-full lg:max-w-sm ">
                        <input type="email" id="email" value={email} onChange={handleChange} placeholder="user id" className="input input-bordered bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none" />
                    </div>
                    <div className="form-control grow w-full lg:max-w-sm">
                        <input type="password" id="password" value={password} onChange={handleChange} placeholder="password" className="input input-bordered bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none" />
                    </div>
                    <button className="btn btn-primary dark:text-black dark:bg-white dark:hover:text-black dark:hover:bg-white mr-auto">log in</button>
                </div>
                <div className='collapse-content text-red-700 my-4 px-0'>
                    there was an error with your information. try again.
                </div>
            </form>
        </div>
    );
};

export default Login;