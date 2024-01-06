import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {BsArrowRightCircle} from 'react-icons/bs'
import { IconContext } from "react-icons";
import Chris from '../assets/carousel/Chris-07.webp'
import {getAuth, onAuthStateChanged} from "firebase/auth";
import '../styles/Navbar.css'
import Tag from "./Tag";

const Navbar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [path, setPath] = useState([]);
    const [query, setQuery] = useState('');
    const [showPath, setShowPath] = useState(true);
    const [fieldFocus, setFieldFocus] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const auth = getAuth();

    useEffect(() => {
        setPath(location.pathname.split('/'));
    }, [location, loggedIn])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        })
    })

    const handleFocus = () => {
        setFieldFocus(true);
        document.querySelector('#navbarInput').focus()
    }

    const handleBlur = (e) => {
        if(e.relatedTarget == null){ //click is not within navbar
            setFieldFocus(false);
            setShowPath(true);
            setQuery('')
        }
    }

    const handleFade = () => {
        if(query === ''){
            setFieldFocus(false);
            setShowPath(true);
            document.querySelector('#navbarInput').blur()
        }
    }

    const handleSubmit = () => {
        navigate(location.pathname + (location.pathname.length === 1 ? '' : '/') + query.toLowerCase().replace(/\s/g, ''));
        document.querySelector('#navbarInput').blur()
        setQuery('')
        setFieldFocus(false);
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            handleSubmit();
        }
    }

    return (
        <div tabIndex={0} onMouseLeave={handleFade} onBlur={handleBlur} className={ 'fixed top-0 z-10 w-full collapse rounded-none group ' + ( !fieldFocus ? 'collapse-close bg-base-200 dark:bg-black' : 'collapse-open bg-base-300 dark:bg-neutral-900' )} style={{transition: 'background-color .3s ease-in-out'}}>
            <div className='navbar collapse-title pr-1.5'>
                <h1 className='text-lg w-full overflow-x-scroll overflow-y-hidden relative' style={{fontFamily: 'Roboto Mono',}}>
                    {( showPath ? (
                        path.map((itm, idx) => {
                            return (!(itm === '' && idx + 1 === path.length) ?
                                <p key={idx} className='min-w-max'><Link className={(idx === 0 && 'font-bold') + ' hover:underline'} to={path.slice(0, idx+1).join('/')}>{idx === 0 ? 'Chris Yates' : itm.charAt(0).toUpperCase() + itm.slice(1)}</Link>&nbsp;/&nbsp;</p>
                                : '')
                        })
                    ) : (
                        <p><Link className={'font-bold hover:underline'} onClick={() => {setShowPath(true)}}>…</Link>&nbsp;/&nbsp;</p>
                    ))}
                    <div onMouseEnter={handleFocus} className='flex justify-center grow'>
                        <input onClick={(e) => {if(e.target.value !== ''){setShowPath(false)}}} id='navbarInput' type='text' placeholder={( !fieldFocus ? '...' : 'type anything...' )} className='text-lg input input-ghost w-full px-0 bg-transparent focus:outline-0 border-none dark:text-white dark:focus:text-white grow' value={query} onChange={(e) => {setQuery(e.target.value); setShowPath(e.target.value === '')}} onKeyDown={handleKeyPress}/>
                        {( fieldFocus && (
                            <IconContext.Provider
                                value={{ size: '30px', style: { strokeWidth: (query === '' ? '0' : '.5'), overflow: 'visible', margin: '4px', }}}
                            >
                                <button type='button' onClick={handleSubmit}>
                                    <BsArrowRightCircle />
                                </button>
                            </IconContext.Provider>
                            )
                        )}
                    </div>

                </h1>
                {((!fieldFocus && loggedIn) && (
                    <Link className="avatar p-2 pr-5 hover:cursor-pointer relative right-0" to={`/profile/${auth.currentUser.uid}`}>
                        <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={Chris} alt="avatar"/>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="collapse-content bg-transparent text-black dark:text-white flex items-center gap-3 overflow-x-scroll" style={{fontFamily: 'Roboto Mono'}}>
                {(path[1] === '' ? (
                    <>
                        <Tag linking text={'Resume'} handleClick={() => {navigate('/resume');setFieldFocus(false);}} className='hover:tag-invert'/>
                        <Tag linking text={'Contact'} handleClick={() => {navigate('/contact');setFieldFocus(false);}} className='hover:tag-invert'/>
                        <Tag linking text={'Posts'} handleClick={() => {navigate('/posts');setFieldFocus(false);}} className='hover:tag-invert'/>
                        {loggedIn ? (
                            <>
                                <Tag linking text={'New Post'} handleClick={() => {navigate('/new-post');setFieldFocus(false);}} className='hover:tag-invert'></Tag>
                                <Tag linking text={'Log Out'} handleClick={() => {navigate('/log-out');setFieldFocus(false);}} className='hover:tag-invert'></Tag>
                            </>
                        ) : (
                            <Tag linking text={'Log In'} handleClick={() => {navigate('/log-in');setFieldFocus(false);}} className='hover:tag-invert'></Tag>
                        )}
                    </>
                ) : (
                    'none'
                ) )}


            </div>
        </div>
    );
};

export default Navbar;