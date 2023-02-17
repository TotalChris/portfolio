import React from 'react';
import spinner from '../assets/spinner.gif'

const Spinner = () => {
    return (
        <div className='m-4'>
            <img src={spinner} height="32px" width="32px" alt="loading" />
        </div>
    );
};

export default Spinner;