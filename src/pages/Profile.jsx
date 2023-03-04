import React from 'react';
import Chris from "../assets/carousel/Chris-7.jpg";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    return (
        <div className='pt-24 mx-4 min-h-screen flex flex-col items-center gap-4' style={{fontFamily: 'Roboto Mono'}}>
            <div className="avatar w-52 h-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                <img src={Chris} alt="avatar"/>
            </div>
            <p className='font-bold text-6xl'>Chris Yates</p>
            <p className='text-xl italic text-neutral-500'>Administrator</p>
            <button type='button' onClick={() => {navigate('/log-out')}} className='btn btn-primary dark:text-black dark:bg-white dark:hover:text-black dark:hover:bg-white w-full mt-auto mb-8 rounded-xl'>Log Out</button>
        </div>
    );
};

export default Profile;