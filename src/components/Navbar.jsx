import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";

const Navbar = () => {

    const location = useLocation();

    const [path, setPath] = useState([]);

    useEffect(() => {
        setPath(location.pathname.split('/'));
        console.log(location.pathname)
    }, [location])

    return (
        <div className='navbar sticky'>
            <h1 className='text-xl ml-4' style={{fontFamily: 'Roboto Mono'}}>
                {
                    path.map((itm, idx) => {
                        return <p><Link className={(idx === 0 && 'font-bold') + ' hover:underline'} to={path.slice(0, idx+1).join('/')}>{idx === 0 ? 'chris yates' : itm}</Link>{idx + 1 !== path.length ? ' /' : ''}&nbsp;</p>;
                    })
                }
            </h1>
        </div>
    );
};

export default Navbar;