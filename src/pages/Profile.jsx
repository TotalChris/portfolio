import React, {useEffect, useState} from 'react';
import Chris from "../assets/carousel/Chris-7.jpg";
import {useNavigate, useParams} from "react-router-dom";
import {db} from '../firebase.config'
import {getAuth} from "firebase/auth";
import {collection, getDocs, query, where, orderBy} from "firebase/firestore";
import Spinner from "../components/Spinner";
import PostListing from "../components/PostListing";

const Profile = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const getUserPosts = async () => {
            const postsRef = collection(db, 'posts');
            const postsQuery = query(postsRef, where('userRef', '==', params.userId), orderBy('timestamp', 'desc'));
            const postSnap = await getDocs(postsQuery);

            let posts = [];
            postSnap.forEach((post) => {
                posts.push({
                    id: post.id,
                    data: post.data(),
                })
            })

            setUserPosts(posts);
            setLoading(false);
        }

        getUserPosts();
    }, [params.userId])

    return (
        <div className='pt-24 mx-4 min-h-screen flex flex-col items-center gap-4' style={{fontFamily: 'Roboto Mono'}}>
            <div className="avatar w-52 h-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                <img src={Chris} alt="avatar"/>
            </div>
            <p className='font-bold text-6xl'>Chris Yates</p>
            <p className='text-xl italic text-neutral-500'>Administrator</p>
            <div className='flex flex-row gap-4 my-4 w-full items-center'>
                <hr className='grow border-black dark:border-white' />
                <h1 className='text-2xl font-bold'>My Posts</h1>
                <hr className='grow border-black dark:border-white' />
            </div>
            {(loading ? <Spinner /> :
                userPosts.map(({data, id}) => {
                    return <PostListing post={data} postId={id} />
                })
            )}
            {(auth.currentUser?.uid === params.userId  && (
                <div className='flex flex-row gap-4 w-full fixed bottom-0 p-8 bg-base-200 dark:bg-black'>
                    <button type='button' onClick={() => {navigate('/new-post')}} className='btn btn-primary dark:text-black dark:bg-white dark:hover:text-black dark:hover:bg-white rounded-xl grow hover:cursor-pointer'>Create Post</button>
                    <button type='button' onClick={() => {navigate('/log-out')}} className='btn btn-outline dark:text-white dark:border-white dark:hover:text-black dark:hover:bg-white rounded-xl grow hover:cursor-pointer'>Log Out</button>
                </div>
            ))}
        </div>
    );
};

export default Profile;