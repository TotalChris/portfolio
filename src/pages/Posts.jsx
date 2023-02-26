import React, {useCallback, useEffect, useRef, useState} from 'react';
import {collection, query, getDocs, orderBy, where} from 'firebase/firestore'
import Spinner from "../components/Spinner";
import {db} from "../firebase.config";
import {BsSortDown, BsSortUpAlt} from "react-icons/bs";
import PostListing from "../components/PostListing";
import Tag from "../components/Tag";

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState([]);
    const sortBox = useRef();


    const addFilter = (text) => {
        if(!filters.includes(text)){
            setFilters((prevState) => {
                return [...prevState, text]
            })
        }
    }

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        const sortType = (sortBox.current.checked ? 'asc' :  'desc')
        const postsRef = collection(db, 'posts');
        let postsQuery;
        if(filters.length > 0){
            postsQuery = await query(postsRef, orderBy('timestamp', sortType), where('tags', 'array-contains-any', filters));
        } else {
            postsQuery = await query(postsRef, orderBy('timestamp', sortType));
        }
        const postsSnap = await getDocs(postsQuery);

        const posts = []

        postsSnap.forEach((doc) => {
            return posts.push({
                id: doc.id,
                data: doc.data(),
            })
        })

        setPosts(posts);
        setLoading(false);
    }, [filters])

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts])

    const removeFilter = (filter) => {
        setFilters((prevState) => {
            return prevState.filter((f) => f !== filter);
        })
    }

    return (
        <div className='pt-24 px-8'>
            <div className='flex flex-row'>
                <h1 className='text-5xl pb-4' style={{fontFamily: 'Roboto Mono'}}>Blog Posts</h1>
                <label className="swap swap-rotate ml-auto">
                    <input type="checkbox" ref={sortBox} onChange={(e) => {
                        setPosts((prevState) => {
                                let copy = [...prevState];
                                return copy.reverse();
                            }
                        )}}/>
                    <BsSortUpAlt className='swap-on fill-black dark:fill-white w-12 h-12' />
                    <BsSortDown className='swap-off fill-black dark:fill-white w-12 h-12' />
                </label>
            </div>
            <hr className='border-black dark:border-white'/>
            {(filters.length > 0 &&
                <div className='flex flex-row mt-8 gap-2'>
                    <p className='text-lg mr-2'>Filters:</p>
                    {filters.map((filter, i) => {
                        return <Tag text={filter} handleRemove={() => {removeFilter(filter)}} removable={true} key={i} className='tag-invert'/>
                    })}
                </div>
            )}
            {(loading ? (
                        <Spinner />
                    ) :
                    <div className='flex flex-col lg:flex-row lg:flex-wrap gap-8 mt-8'>
                        {posts.map((post, i) => {
                            return <PostListing post={post.data} postId={post.id} handleFilterPush={addFilter} key={i}/>
                        })}
                    </div>
            )}
        </div>
    );
};

export default Posts;