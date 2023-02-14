import React, {useEffect, useRef, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {BsArrowRightCircle} from 'react-icons/bs'
import { IconContext } from "react-icons";

const Navbar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [path, setPath] = useState([]);
    const [query, setQuery] = useState('');
    const [fieldFocus, setFieldFocus] = useState(false);

    const headerRef = useRef()

    useEffect(() => {
        setPath(location.pathname.split('/'));
    }, [location])

    const handleFocus = () => {
        setFieldFocus(true);

    }

    const handleBlur = (e) => {
        if(e.relatedTarget == null){ //click is not within navbar
            setFieldFocus(false);
            setQuery('')
        }

    }


    const handleSubmit = () => {
        navigate(location.pathname + (location.pathname.length === 1 ? '' : '/') + query.toLowerCase());
        setQuery('')
        setFieldFocus(false);
    }

    return (
        <div tabIndex={0} onBlur={handleBlur} className={ 'collapse group ' + ( !fieldFocus ? 'collapse-close bg-base-200 dark:bg-black' : 'collapse-open bg-base-300 dark:bg-neutral-900' )} style={{transition: 'background-color .3s ease-in-out'}}>
            <div className='navbar sticky collapse-title pr-1.5'>
                <h1 className='text-xl ml-4 w-full overflow-hidden relative' ref={headerRef} style={{fontFamily: 'Roboto Mono',}}>
                    {(!fieldFocus && (
                        path.map((itm, idx) => {
                            return (!(itm === '' && idx + 1 === path.length) ?
                                <p className='min-w-max'><Link className={(idx === 0 && 'font-bold') + ' hover:underline'} to={path.slice(0, idx+1).join('/')}>{idx === 0 ? 'chris yates' : itm}</Link>&nbsp;/&nbsp;</p>
                                : '')
                        })
                    ))}
                    <div onFocus={handleFocus} className='flex justify-center grow mr-4'>
                        <input type='text' placeholder={( !fieldFocus ? 'menu' : 'type anything...' )} className='text-xl input input-ghost min-w-max px-0 bg-transparent focus:outline-0 dark:text-white dark:focus:text-white grow' value={query} onChange={(e) => setQuery(e.target.value)}/>
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
            </div>
            <div className="collapse-content bg-transparent text-black dark:text-primary-content ml-4 flex gap-3" style={{fontFamily: 'Roboto Mono'}}>
                <div className='font-bold'>suggestions:</div>
                {(path[1] === '' ? (
                    <>
                        <div className="badge badge-outline p-3 rounded-full text-black border-black dark:text-white dark:border-white hover:cursor-pointer" onClick={() => setQuery('contact')}>contact</div>
                        <div className="badge badge-outline p-3 rounded-full text-black border-black dark:text-white dark:border-white hover:cursor-pointer" onClick={() => setQuery('resume')}>resume</div>
                    </>
                    ) : (
                    <div className='text-neutral-500'> none</div>
                ))}

            </div>
        </div>
    );
};

export default Navbar;