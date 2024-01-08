import React from 'react';
import {BsXCircle, BsArrowUpRightCircle} from 'react-icons/bs'

const Tag = ({text, removable, handleClick, handleRemove, className, linking}) => {
    return (
        <div
            className={"badge badge-outline min-w-max select-none p-3 h-6 rounded-full border-black dark:border-white hover:cursor-pointer text-sm " + (
                className && className.includes('hover:tag-invert') ? "hover:bg-black hover:dark:bg-white hover:text-white hover:dark:text-black" : (
                    className && className.includes('tag-invert') ? "bg-black dark:bg-white text-white dark:text-black" :
                        "bg-transparent text-black dark:text-white"
                )
            )}
            onClick={() => {handleClick && handleClick(text)}}
        >
            {(removable && <BsXCircle onClick={() => {handleRemove && handleRemove(text)}} className='mr-1' style={{marginLeft: '-0.35rem'}}/>)}
            {text}
            {(linking && <BsArrowUpRightCircle className='ml-1' style={{marginRight: '-0.35rem'}}/>)}
        </div>
    );
};

export default Tag;