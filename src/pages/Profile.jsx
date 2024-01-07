import React, {useEffect, useState, useRef} from 'react';
import Chris from "../assets/carousel/Chris-07.webp";
import {useNavigate, useParams} from "react-router-dom";
import {db} from '../firebase.config'
import {getAuth} from "firebase/auth";
import {collection, getDocs, query, where, orderBy} from "firebase/firestore";
import Spinner from "../components/Spinner";
import PostListing from "../components/PostListing";
import Tag from '../components/Tag';
import {BsSortUpAlt, BsSortDown} from 'react-icons/bs'

const Profile = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const params = useParams();
    const sortBox = useRef();

    const [loading, setLoading] = useState(true);
    const [userPosts, setUserPosts] = useState([]);
    const [filters, setFilters] = useState([]);

    const removePost = (postId) => {
        setUserPosts((prevState) => {
            return prevState.filter((post) => post.id !== postId);
        })
    }

    const removeFilter = (filter) => {
        setFilters((prevState) => {
            return prevState.filter((f) => f !== filter);
        })
    }

    const addFilter = (text) => {
        if(!filters.includes(text)){
            setFilters((prevState) => {
                return [...prevState, text]
            })
        }
    }

    useEffect(() => {
        const getUserPosts = async () => {
            const sortType = (sortBox.current.checked ? 'asc' :  'desc')
            const postsRef = collection(db, 'posts');
            let postsQuery;
            if(filters.length > 0){
                postsQuery = await query(postsRef, orderBy('timestamp', sortType), where('tags', 'array-contains-any', filters));
            } else {
                postsQuery = await query(postsRef, orderBy('timestamp', sortType));
            }
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
    }, [params.userId, filters])

    return (
        <div className='pt-24 pb-36 mx-4 min-h-screen flex flex-col items-center gap-4' style={{fontFamily: 'Roboto Mono'}}>
            <div className="avatar w-52 h-52 rounded-full ring dark:ring-white ring-black ring-offset-base-100 ring-offset-2 overflow-hidden">
                <img src={Chris} alt="avatar"/>
            </div>
            <p className='font-bold text-6xl'>Chris Yates</p>
            <p className='text-xl italic text-neutral-500'>Administrator</p>
            <div className='flex flex-row w-full mx-8'>
                <h1 className='text-4xl' style={{fontFamily: 'Roboto Mono'}}>Blog Posts</h1>
                <label className="swap swap-rotate ml-auto">
                    <input type="checkbox" ref={sortBox} onChange={() => {
                        setUserPosts((prevState) => {
                            let copy = [...prevState];
                            return copy.reverse();
                        }
                        )}}/>
                    <BsSortUpAlt className='swap-on fill-black dark:fill-white w-8 h-8' />
                    <BsSortDown className='swap-off fill-black dark:fill-white w-8 h-8' />
                </label>
            </div>
            <hr className='border-black dark:border-white w-full'/>
            {(filters.length > 0 &&
                <div className='flex flex-row mt-8 gap-2'>
                    <p className='text-lg mr-2'>Filters:</p>
                    {filters.map((filter, i) => {
                        return <Tag text={filter} handleRemove={() => {removeFilter(filter)}} removable={true} key={i} className='tag-invert'/>
                    })}
                </div>
            )}
            {(loading ? <Spinner /> :
                userPosts.map(({data, id}) => {
                    return <PostListing post={data} postId={id} handleFilterPush={addFilter} handleRemove={removePost}/>
                })
            )}
            {(auth.currentUser?.uid === params.userId  && (
                <div className='flex flex-row gap-4 w-full fixed bottom-0 p-4 bg-base-200 dark:bg-black'>
                    <button type='button' onClick={() => {navigate('/new-post')}} className='btn btn-outline dark:text-white dark:border-white dark:hover:text-black dark:hover:bg-white rounded-xl grow hover:cursor-pointer'>Create Post</button>
                    <button type='button' onClick={() => {navigate('/log-out')}} className='btn btn-outline dark:text-white dark:border-white dark:hover:text-black dark:hover:bg-white rounded-xl grow hover:cursor-pointer'>Log Out</button>
                </div>
            ))}
        </div>
    );
};

export default Profile;