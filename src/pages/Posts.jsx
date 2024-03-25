import {useCallback, useEffect, useRef, useState, useContext} from 'react';
import {collection, query, getDocs, orderBy, where} from 'firebase/firestore'
import Spinner from "./Spinner";
import {db} from "../firebase.config";
import {BsSortDown, BsSortUpAlt} from "react-icons/bs";
import PostListing from "../components/PostListing";
import Tag from "../components/Tag";
import { Helmet } from 'react-helmet';
import PageScaffold from '../components/PageScaffold';
import { AuthContext } from '../context/AuthProvider';

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState([]);
    const sortBox = useRef();
    const {currentUser, authLoaded} = useContext(AuthContext);

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
        let filterStack = [orderBy('timestamp', sortType)]
        if(filters.length > 0){
            filterStack.push(where('tags', 'array-contains-any', filters))
        }
        if(currentUser === null){
            filterStack.push(where('isPrivate', "==", false))
        }
        console.log(filterStack)
        const postsQuery = await query(postsRef, ...filterStack);
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
        if(authLoaded){
            fetchPosts().then();
        }
    }, [fetchPosts, authLoaded])

    const removeFilter = (filter) => {
        setFilters((prevState) => {
            return prevState.filter((f) => f !== filter);
        })
    }

    const removePost = (postId) => {
        setPosts((prevState) => {
            return prevState.filter((post) => post.id !== postId);
        })
    }

    return (
        <PageScaffold>
            <Helmet>
                <title>Chris Yates | Blog Posts</title>
            </Helmet>
            <div className='flex flex-row'>
                <h1 className='text-5xl pb-4'>Blog Posts</h1>
                <label className="swap swap-rotate ml-auto">
                    <input type="checkbox" ref={sortBox} onChange={() => {
                        setPosts((prevState) => {
                                let copy = [...prevState];
                                return copy.reverse();
                            }
                        )}}/>
                    <BsSortUpAlt className='swap-on fill-black dark:fill-white w-12 h-12' />
                    <BsSortDown className='swap-off fill-black dark:fill-white w-12 h-12' />
                </label>
            </div>
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
                        {posts.length > 0 ?
                            posts.map((post, i) => {
                                return <PostListing post={post.data} postId={post.id} handleFilterPush={addFilter} handleRemove={removePost} key={i}/>
                            }) :
                            <h1>No Posts Yet!</h1>
                        }
                    </div>
            )}
        </PageScaffold>
    );
};

export default Posts;