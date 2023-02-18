import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className='notFound mx-6 pt-24' style={{fontFamily: 'Roboto Mono'}}>
            <h1 className='text-6xl'>404</h1>
            <div className='w-full h-screen'>
                <p className='mt-2 font-bold'>There's no way forward.<br /><Link to='/' className='font-normal hover:underline'>Return home</Link>.</p>
            </div>
        </div>
    );
};

export default NotFound;