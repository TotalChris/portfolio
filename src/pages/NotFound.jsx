import {Link} from "react-router-dom";
import PageScaffold from "../components/PageScaffold";

const NotFound = () => {
    return (
        <PageScaffold>
            <h1 className='text-5xl'>404</h1>
            <div className='w-full h-screen'>
                <p className='mt-2 font-bold'>There&apos;s no way forward.<br /><Link to='/' className='font-normal hover:underline'>Return home</Link>.</p>
            </div>
        </PageScaffold>
    );
};

export default NotFound;