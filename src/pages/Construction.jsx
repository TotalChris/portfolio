import React from 'react';
import {Link} from "react-router-dom";

const Contact = () => {
    return (
        <div className='mx-6'>
            <h1 className='text-6xl mt-16' style={{fontFamily: 'Roboto Mono'}}>This room is empty...</h1>
            <div className='w-full h-screen'>
                <p className='mt-2 font-bold'>I'm moving in as we speak. Come back soon!&nbsp;<br /><Link to='/' className='font-normal hover:underline'>Return home</Link>.</p>
            </div>
        </div>
    );
};

export default Contact;