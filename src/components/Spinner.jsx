import React from 'react';
import spinner from '../assets/spinner.gif'

const Spinner = () => {
    return (
        <div className='flex justify-center items-center h-96'>
            <img src={spinner} height="64px" width="64px" alt="loading" style={{height: '64px', width: '64px'}} />
        </div>
    );
};

export default Spinner;