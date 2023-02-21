import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import Spinner from "../components/Spinner";


const Post = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});

    const dateFormatter = Intl.DateTimeFormat("en-US", {month: 'long', day: 'numeric', year: "numeric"})

    useEffect(() => {
        fetchPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchPost = async () => {

        const postRef = await getDoc(doc(db, 'posts', params.postId));
        if(postRef.exists()){
            setPost(postRef.data());
            setLoading(false);
        } else {
            navigate('/not-found')
        }
    }

    return (
        <div className='pt-24 flex flex-col items-center gap-6 mx-4 px-12 lg:px-36 xl:px-64' style={{fontFamily: 'Roboto Mono'}}>
            {(loading ? (
                <Spinner/>
            ) : (
                <>
                    <img src={post.header} className='w-full h-96 object-cover rounded-3xl text-left' alt='post'/>
                    <h1 className='text-6xl font-bold relative l-0 w-full'>{post.title}</h1>
                    <div className='flex flex-row gap-2 overflow-x-scroll relative l-0 w-full'>
                        {post.tags && post.tags.map((tag, i) => {
                            return <div key={i} className="badge badge-outline min-w-max p-3 rounded-full text-black border-black dark:text-white dark:border-white hover:cursor-pointer">{tag}</div>
                        })}
                    </div>
                    <p className='text-md w-full text-neutral-500'>Posted by Chris Yates on {dateFormatter.format(post.timestamp.toDate())}</p>
                    <hr className='border-black dark:border-white' style={{width: '100%'}}/>
                    <p className='text-xl w-full'>{post.content}</p>
                    <div></div>
                </>
            ) )}

        </div>
    );
};

export default Post;