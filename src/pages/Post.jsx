import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, Link} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import Spinner from "../components/Spinner";
import ReactMarkdown from "react-markdown";
import {Helmet, HelmetProvider} from "react-helmet-async";
import Chris from "../assets/carousel/Chris-7.jpg";


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

    const helmetContext = {};
    return (
        <div className='pt-24 flex flex-col items-center gap-6 mx-4 px-2 sm:px-12 lg:px-36 xl:px-64' style={{fontFamily: 'Roboto Mono'}}>
            {(loading ? (
                <Spinner/>
            ) : (
                <>
                    <HelmetProvider context={helmetContext}>
                    <Helmet>
                        <title>{post.title} - Chris Yates</title>

                        <meta itemprop="name" content={post.title} />
                        <meta itemprop="description" content={post.subtitle} />
                        <meta itemprop="image" content={post.header} />

                        <meta property="og:url" content={'https://totalchris.com/posts/' + params.postId} />
                        <meta property="og:type" content="website" />
                        <meta property="og:title" content={post.title} />
                        <meta property="og:description" content={post.subtitle} />
                        <meta property="og:image" content={post.header} />

                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:title" content={post.title} />
                        <meta name="twitter:description" content={post.subtitle} />
                        <meta name="twitter:image" content={post.header} />
                    </Helmet>
                    <img src={post.header} className='w-full h-96 object-cover rounded-3xl text-left' alt='post'/>
                    <h1 className='text-6xl font-bold relative l-0 w-full'>{post.title}</h1>
                    <blockquote className="text-xl border-l-4 pl-4 border-neutral-500 text-neutral-600 dark:text-neutral-400 w-full">{post.subtitle}</blockquote>
                    <div className='flex flex-row w-full items-center'>
                        <Link className="avatar p-2 pr-5 hover:cursor-pointer" to={`/profile/${post.userRef}`}>
                            <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={Chris} alt="avatar"/>
                            </div>
                        </Link>
                        <p className='text-md w-full text-neutral-500'>Posted by Chris Yates on {dateFormatter.format(post.timestamp.toDate())}</p>
                    </div>
                    <div className='flex flex-row gap-2 overflow-x-scroll relative l-0 w-full'>
                        {post.tags && post.tags.map((tag, i) => {
                            return <div key={i} className="badge badge-outline min-w-max p-3 rounded-full text-black border-black dark:text-white dark:border-white hover:cursor-pointer">{tag}</div>
                        })}
                    </div>
                    <hr className='border-black dark:border-white' style={{width: '100%'}}/>
                    <ReactMarkdown className='prose prose-lg dark:!prose-invert min-w-full mb-16'>{post.content}</ReactMarkdown>
                    </HelmetProvider>
                </>
            ) )}

        </div>
    );
};

export default Post;