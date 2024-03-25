import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {db} from "../firebase.config";
import Tag from "./Tag";
import {getAuth} from 'firebase/auth';
import {doc, deleteDoc, updateDoc} from 'firebase/firestore'
import {BsGlobe, BsPerson} from 'react-icons/bs'
import Loading from "../components/Loading"

const PostListing = ({post, postId, handleFilterPush, handleRemove}) => {

    const dateFormatter = Intl.DateTimeFormat("en-US", {month: 'long', day: 'numeric', year: "numeric"})

    const [pendingChange, setPendingChange] = useState(false);
    const [pendingDelete, setPendingDelete] = useState(false);

    const changePostVisibility = async () => {
        setPendingChange(true);
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {isPrivate: (!post.isPrivate)});
        post.isPrivate = !post.isPrivate;
        setPendingChange(false);
    }

    const deletePost = async () => {
        setPendingDelete(true);
        await deleteDoc(doc(db, 'posts', postId));
        handleRemove(postId);
        setPendingDelete(false)
    }

    return (
        <div className='w-full sm:w-96 flex flex-col cursor-pointer'>
            <Link to={'/posts/' + postId} className='w-full'><img src={post.header} className='h-56 sm:h-52 object-cover rounded-xl w-full' alt='post header'/></Link>
            <div className='flex flex-col lg:text-left lg:ml-0 gap-2 max-w-2/3 mt-2'>
                <Link to={'/posts/' + postId} className='w-auto'><p className='text-2xl font-bold mt-2'>{post.title}</p></Link>
                <Link to={'/posts/' + postId} className='w-auto'><p className='text-sm italic border-l-2 pl-2 border-neutral-500 text-neutral-600 dark:text-neutral-400'>{post.subtitle}</p></Link>
                <div className='flex flex-row flex-wrap gap-2 mt-2 justify-start'>
                    {post.tags.map((tag, i) => {
                        return <Tag text={tag} handleClick={handleFilterPush} key={i} className='hover:tag-invert'/>
                    })}
                </div>
                <div className='flex flex-row justify-between text-md text-neutral-500'>{dateFormatter.format(post.timestamp.toDate())}{post.isPrivate?<BsPerson className="text-xl"></BsPerson>:<BsGlobe className="text-xl"></BsGlobe>}</div>
            </div>
            {getAuth().currentUser ? <div className='flex flex-row mt-4 w-full justify-between'>
                <button type="button" onClick={changePostVisibility} className="mr-2 btn btn-primary dark:text-black dark:bg-white dark:hover:text-black dark:hover:bg-white rounded-xl hover:cursor-pointer border-none grow">{pendingChange ? <Loading /> : 'Make ' + (post.isPrivate ? 'Public' : 'Private' )}</button>
                <button type="button" onClick={deletePost} className="ml-2 btn btn-outline dark:text-white dark:border-white dark:hover:text-black dark:hover:bg-white rounded-xl hover:cursor-pointer grow">{pendingDelete ? <Loading /> : 'Delete'}</button>
            </div> : <></>}
        </div>
    );
};

export default PostListing;