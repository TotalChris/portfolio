import React from 'react';
import {Link} from "react-router-dom";
import Tag from "./Tag";

const PostListing = ({post, postId, handleFilterPush}) => {

    const dateFormatter = Intl.DateTimeFormat("en-US", {month: 'long', day: 'numeric', year: "numeric"})

    return (
        <div className='w-full lg:w-96 lg:h-auto flex flex-row lg:flex-col'>
            <Link to={'/posts/' + postId} className='w-36 lg:min-w-full'><img src={post.header} className='h-full object-cover rounded-xl w-full lg:h-52' alt='post header'/></Link>
            <div className='flex flex-col text-right lg:text-left ml-auto lg:ml-0 gap-2 max-w-2/3 lg:mt-4'>
                <Link to={'/posts/' + postId} className='w-auto'><p className='text-xl font-bold'>{post.title}</p></Link>
                <Link to={'/posts/' + postId} className='w-auto'><p className='text-md text-neutral-500'>{post.subtitle}</p></Link>
                <div className='flex flex-row gap-2 justify-end lg:justify-start mt-2'>
                    {post.tags.map((tag, i) => {
                        return <Tag text={tag} handleClick={handleFilterPush} key={i} className='hover:tag-invert'/>
                    })}
                </div>
                <p className='text-md text-neutral-500'>{dateFormatter.format(post.timestamp.toDate())}</p>
            </div>
        </div>
    );
};

export default PostListing;