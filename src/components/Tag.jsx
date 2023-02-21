import React from 'react';
import {BsXCircle} from 'react-icons/bs'

const Tag = ({text, removable, handleClick, handleRemove}) => {
    return (
        <div
            className="badge badge-outline min-w-max select-none p-3 h-6 rounded-full text-black border-black dark:text-white dark:border-white hover:cursor-pointer"
            onClick={handleClick}
        >
            {(removable && <BsXCircle onClick={() => {handleRemove && handleRemove(text)}} className='mr-1' style={{marginLeft: '-0.35rem'}}/>)}
            {text}
        </div>
    );
};

export default Tag;