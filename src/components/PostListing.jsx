import React from 'react';
import {Link} from "react-router-dom";
import Tag from "./Tag";

const PostListing = ({post, postId, handleFilterPush}) => {

    const dateFormatter = Intl.DateTimeFormat("en-US", {month: 'long', day: 'numeric', year: "numeric"})

    return (
        <div className='w-full sm:w-96 flex flex-col'>
            <Link to={'/posts/' + postId} className='w-full'><img src={post.header} className='h-full sm:h-52 object-cover rounded-xl w-full' alt='post header'/></Link>
            <div className='flex flex-col lg:text-left lg:ml-0 gap-2 max-w-2/3 mt-2'>
                <Link to={'/posts/' + postId} className='w-auto'><p className='text-xl font-bold'>{post.title}</p></Link>
                <Link to={'/posts/' + postId} className='w-auto'><p className='text-md border-l-4 pl-4 border-neutral-500 text-neutral-600 dark:text-neutral-400'>{post.subtitle}</p></Link>
                <div className='flex flex-row gap-2 mt-2 justify-start'>
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