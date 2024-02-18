import React from 'react';
import {Link} from "react-router-dom";

const ThankYou = () => {
    return (
        <div className='mx-auto max-w-screen-col pt-24' style={{fontFamily: 'Roboto Mono'}}>
            <h1 className='text-5xl'>Thanks!</h1>
            <div className='w-full h-screen'>
                <p className='mt-2 font-bold'>Your inquiry was sent. I'll be in touch!<br /><Link to='/' className='font-normal hover:underline'>return home</Link>.</p>
            </div>
        </div>
    );
};

export default ThankYou;