import {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import '../styles/Navbar.css'
import { BsDoorOpenFill, BsGithub, BsKeyFill } from 'react-icons/bs';

const Navbar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        })
    })

    return (
        <div className='fixed top-0 z-10 bg-white dark:bg-black w-full' style={{maxWidth: '100vw'}}>
            <nav className='h-8 flex mx-4 lg:mx-8 mt-8 text-black dark:text-white gap-2 text-md'>
                <Link to="/" className={`${location.pathname === '/' && 'current'}`}>Home</Link>
                <Link to="/resume" className={`${location.pathname === '/resume' && 'current'}`}>Resume</Link>
                <Link to="/contact" className={`${location.pathname === '/contact' && 'current'}`}>Contact</Link>
                {loggedIn  && (
                    <Link to="/posts" className={`${location.pathname === '/posts' && 'current'}`}>Posts</Link>
                )}
                {loggedIn ? (
                    <Link to="/log-out" className={`endcap ${location.pathname === '/log-out' && 'current'}`} >
                        <BsDoorOpenFill />
                    </Link>
                ) : (
                    <Link to="/log-in" className={`endcap ${location.pathname === '/log-in' && 'current'}`} >
                        <BsKeyFill />
                    </Link>
                )}
                <a href="https://github.com/totalchris/" className={`endcap ${location.pathname === '#' && 'current'}`}>
                    <BsGithub />
                </a>
            </nav>
        </div>
    )
}
export default Navbar;