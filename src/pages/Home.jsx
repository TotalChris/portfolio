import React from 'react';
import SlowPhotoCarousel from "../components/SlowPhotoCarousel";
import Chris1 from "../assets/carousel/Chris-1.jpg";
import Chris2 from "../assets/carousel/Chris-2.jpg";
import Chris3 from "../assets/carousel/Chris-3.jpg";
import Chris4 from "../assets/carousel/Chris-4.jpg";
import Chris5 from "../assets/carousel/Chris-5.jpg";
import Chris6 from "../assets/carousel/Chris-6.jpg";
import Chris7 from "../assets/carousel/Chris-7.jpg";
import Chris8 from "../assets/carousel/Chris-8.jpg";
import Chris9 from "../assets/carousel/Chris-9.jpg";
import Chris10 from "../assets/carousel/Chris-10.jpg";
import Chris11 from "../assets/carousel/Chris-11.jpg";
import Chris12 from "../assets/carousel/Chris-12.jpg";
import Chris13 from "../assets/carousel/Chris-13.jpg";

import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className="hero min-h-screen overflow-hidden pt-24">
            <div className="flex flex-col p-0 lg:flex-row lg:p-16 2xl:max-w-screen-2xl w-screen" style={{gap: '16px',}}>
                <SlowPhotoCarousel images={[Chris1, Chris2, Chris3, Chris4, Chris5, Chris6, Chris7, Chris8, Chris9, Chris10, Chris11, Chris12, Chris13]} className='lg:w-3/5'/>
                <div className='lg:min-w-1/2 lg:p-0 p-8 flex flex-col justify-between'>
                    <h1 className="text-5xl font-bold" style={{fontFamily: 'Roboto Mono',}}>Hi, I'm Chris.</h1>
                    <p className='py-4' style={{maxWidth: '440px'}}>I'm a 22-year-old independent web developer based in the United States. I have big dreams about what the web and its portability and capability offers us. I have extensive experience in vanilla web design, and I am becoming familiar with popular frameworks like React.</p>
                    <div className='flex sm:flex-row flex-col gap-2' style={{fontFamily: 'Roboto Mono',}}>
                        <button className="btn btn-primary dark:text-black dark:bg-white dark:hover:text-black dark:hover:bg-white rounded-full" onClick={() => {navigate('/resume')}}>My Resume</button>
                        <button className="btn btn-outline dark:text-white dark:border-white dark:hover:text-black dark:hover:bg-white rounded-full" onClick={() => {window.location.href = 'https://github.com/sponsors/TotalChris'}}>Sponsor</button>
                        <button className="btn btn-outline dark:text-white dark:border-white dark:hover:text-black dark:hover:bg-white rounded-full" onClick={() => {navigate('/contact')}}>Contact</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Home;