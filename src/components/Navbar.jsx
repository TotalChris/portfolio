import {useContext} from 'react';
import {Link, useLocation} from "react-router-dom";
import spinner from '../assets/spinner.gif'
import '../styles/Navbar.css'
import { BsDoorOpenFill, BsGithub, BsKeyFill } from 'react-icons/bs';
import { AuthContext } from '../context/AuthProvider';

const Navbar = () => {

    const location = useLocation();
    const {currentUser, authLoaded} = useContext(AuthContext);

    return (
        <div className='fixed top-0 z-10 bg-white dark:bg-black w-full' style={{maxWidth: '100vw'}}>
            <nav className='h-8 flex mx-2 sm:mx-4 lg:mx-8 mt-6 text-black dark:text-white gap-2 text-md'>
                <Link to="/" className={`navbar-link font-bold  ${location.pathname === '/' && 'current'}`}>Chris Yates</Link>
                <Link to="/resume" className={`navbar-link ${location.pathname === '/resume' && 'current'}`}>Resume</Link>
                <Link to="/contact" className={`navbar-link ${location.pathname === '/contact' && 'current'}`}>Contact</Link>
                <Link to="/posts" className={`navbar-link ${location.pathname === '/posts' && 'current'}`}>Posts</Link>
                {authLoaded ? 
                    (currentUser ? (
                        <Link to="/log-out" className={`navbar-link endcap ${location.pathname === '/log-out' && 'current'}`} >
                            <BsDoorOpenFill />
                        </Link>
                    ) : (
                        <Link to="/log-in" className={`navbar-link endcap ${location.pathname === '/log-in' && 'current'}`} >
                            <BsKeyFill />
                        </Link>
                    )) : ( 
                        <Link to="/log-in" className={`navbar-link endcap pt-1 ${location.pathname === '/log-in' && 'current'}`} >
                            <img src={spinner} alt="loading" style={{height: '14.4px', width: '14.4px'}} />
                        </Link>
                    )
                }
                <a href="https://github.com/totalchris/" className={`navbar-link endcap ${location.pathname === '#' && 'current'}`}>
                    <BsGithub />
                </a>
            </nav>
        </div>
    )
}
export default Navbar;