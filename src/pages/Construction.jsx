import {Link} from "react-router-dom";

const Construction = () => {
    return (
        <div className='mx-auto max-w-screen-col pt-24'>
            <h1 className='text-5xl' style={{fontFamily: 'Roboto Mono'}}>This room is empty...</h1>
            <div className='w-full h-screen'>
                <p className='mt-2 font-bold'>I&apos;m moving in as we speak. Come back soon!&nbsp;<br /><Link to='/' className='font-normal hover:underline'>Return home</Link>.</p>
            </div>
        </div>
    );
};

export default Construction;