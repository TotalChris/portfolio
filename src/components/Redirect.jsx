import React, {useEffect} from 'react';
import Spinner from "./Spinner";

const Redirect = ({to}) => {

    useEffect(() => {
        window.location.href = to;
    }, [to])

    return (
        <div className='pt-24 px-4'>
            <Spinner />
        </div>
    );
};

export default Redirect;