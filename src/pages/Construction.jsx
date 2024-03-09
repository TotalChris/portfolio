import {Link} from "react-router-dom";
import PageScaffold from "../components/PageScaffold";

const Construction = () => {
    return (
        <PageScaffold>
           <h1 className='text-5xl'>This room is empty...</h1>
            <div className='w-full h-screen'>
                <p className='mt-2 font-bold'>I&apos;m moving in as we speak. Come back soon!&nbsp;<br /><Link to='/' className='font-normal hover:underline'>Return home</Link>.</p>
            </div>
        </PageScaffold>
    );
};

export default Construction;