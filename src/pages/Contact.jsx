import React from 'react';
import {useNavigate} from "react-router-dom";
const Contact = () => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/')
    }

    return (
        <div className='mx-6 pt-24'  style={{fontFamily: 'Roboto Mono'}}>
            <h1 className='text-6xl'>Contact Me</h1>
            <form netlify method="POST" onSubmit={handleSubmit} className='w-full md:max-w-screen-md'>
                <input type="hidden" name="form-name" value="contact" />
                <div className='flex flex-row gap-8 mt-8 w-full flex-wrap'>
                    <input type="text" name="name" placeholder='name' className='input input-bordered bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none grow min-w-full md:min-w-0' />
                    <input type="text" name="contact" placeholder='email or phone number' className='input input-bordered bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none grow min-w-full md:min-w-0' />
                </div>
                <div className='flex flex-row gap-8 mt-8'>
                    <textarea name="inquiry" className="textarea w-full bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none h-64 md:h-32" placeholder="inquiry"></textarea>
                </div>
                <div className='flex flex-row gap-8 mt-8'>
                    <button type='submit' className='ml-auto btn btn-primary dark:text-black dark:bg-white dark:hover:text-black dark:hover:bg-white'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Contact;