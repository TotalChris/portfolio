import {Link} from "react-router-dom";

const ThankYou = () => {
    return (
        <div className='mx-auto max-w-screen-col pt-24 px-4'>
            <h1 className='text-5xl'>Thanks!</h1>
            <div className='w-full h-screen'>
                <p className='mt-2'>Your inquiry was sent. I&apos;ll be in touch!<Link to='/' className='font-bold hover:underline'>Return Home</Link></p>
            </div>
        </div>
    );
};

export default ThankYou;