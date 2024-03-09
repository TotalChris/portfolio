import {useEffect, useState, useContext} from 'react';
import {useParams, useNavigate, Link} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import Spinner from "../components/Spinner";
import ReactMarkdown from "react-markdown";
import {Helmet, HelmetProvider} from "react-helmet-async";
import Chris from "../assets/carousel/Chris-07.webp";
import PageScaffold from "../components/PageScaffold";
import {AuthContext} from "../context/AuthProvider"


const Post = () => {

    const params = useParams();
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext)

    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});

    const dateFormatter = Intl.DateTimeFormat("en-US", {month: 'long', day: 'numeric', year: "numeric"})

    useEffect(() => {
        fetchPost().then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchPost = async () => {

        const postRef = await getDoc(doc(db, 'posts', params.postId));
        if(postRef.exists() && (!postRef.data().isPrivate || (postRef.data().isPrivate && currentUser))){
            setPost(postRef.data());
            setLoading(false);
        } else {
            navigate('/not-found')
        }
    }

    const helmetContext = {};
    return (
        <PageScaffold>
        <div className='flex flex-col items-center gap-6'>
            {(loading ? (
                <Spinner/>
            ) : (
                <>
                    <HelmetProvider context={helmetContext}>
                    <Helmet>
                        <title>{post.title} - Chris Yates</title>

                        <meta itemProp="name" content={post.title} />
                        <meta itemProp="description" content={post.subtitle} />
                        <meta itemProp="image" content={post.header} />

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
                    <h1 className='text-5xl relative l-0 w-full'>{post.title}</h1>
                    <blockquote className="text-xl border-l-4 pl-4 border-neutral-500 text-neutral-600 dark:text-neutral-400 w-full">{post.subtitle}</blockquote>
                    <div className="w-full h-auto flex flex-col lg:flex-row">
                        <div className='flex flex-row w-full items-center lg:w-auto lg:mr-2'>
                            <Link className="avatar p-2 pr-5 hover:cursor-pointer" to={`/profile/${post.userRef}`}>
                                <div className="w-8 h-8 rounded-full ring ring-offset-base-100 ring-offset-2 dark:ring-white ring-black">
                                    <img src={Chris} alt="avatar"/>
                                </div>
                            </Link>
                            <p className='text-md w-full text-neutral-500'>Posted by Chris Yates on {dateFormatter.format(post.timestamp.toDate())}</p>
                        </div>
                        <div className='flex flex-row flex-wrap gap-2 w-full lg:w-1/2 py-4'>
                            {post.tags && post.tags.map((tag, i) => {
                                return <div key={i} className="badge badge-outline min-w-max p-3 rounded-full text-black border-black dark:text-white dark:border-white hover:cursor-pointer">{tag}</div>
                            })}
                        </div>
                    </div>
                    
                    <ReactMarkdown className='prose prose-lg dark:!prose-invert max-w-full mb-16'>{post.content}</ReactMarkdown>
                    </HelmetProvider>
                </>
            ) )}

        </div>
        </PageScaffold>
    );
};

export default Post;