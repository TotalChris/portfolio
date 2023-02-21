import React, {useEffect, useRef, useState} from 'react';
import TagInput from "../components/TagInput";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {db} from "../firebase.config";
import {useNavigate} from "react-router-dom";
import Spinner from "../components/Spinner";

const PostForm = () => {

    const navigate = useNavigate();
    const auth = getAuth();
    const isMounted = useRef(true);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({...formData, userRef: user.uid})
                } else {
                    navigate('/sign-in')
                }
            })
        }
        return () => {
            isMounted.current = false;
        }
    }, [isMounted]);

    const [formData, setFormData] = useState({
        title: '',
        tags: [],
        headerImg: undefined,
        content: '',
    })

    const {title, tags, headerImg, content} = formData;

    const storage = getStorage();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        let formDataCopy = {...formData, header: '', timestamp: serverTimestamp()};
        try{
            const snapshot = await uploadBytes(ref(storage, crypto.randomUUID()), headerImg)
            formDataCopy.header = await getDownloadURL(snapshot.ref);
            delete formDataCopy.headerImg;
        } catch (e) {
            console.log(e);
        }

        await setDoc(doc(db, 'posts', title.trim().toLowerCase().replace(/ /g, "-")), formDataCopy);
        navigate('/post/' + title.trim().toLowerCase().replace(/ /g, "-"))
    }

    const handleChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: (e.target.id === 'headerImg' ? e.target.files[0] : e.target.value),
            }
        })
    };

    return (
        <div className='mx-6 pt-24'  style={{fontFamily: 'Roboto Mono'}}>
            <h1 className='text-6xl'>Write a Post</h1>
            <form className='py-12 flex flex-col' onSubmit={handleSubmit}>
                <div className={'collapse group ' + (title.length > 0 ? 'collapse-open' : 'mb-8')}>
                    <input required={true} id="title" value={title} onChange={handleChange} type='text' placeholder='Title' className='input input-bordered bg-transparent border-black text-black dark:border-white dark:text-white outline-none focus:outline-none text-2xl py-3 h-auto w-full'/>
                    <p className='collapse-content break-words'>Your post will live at https://totalchris.com/posts/{title.trim().toLowerCase().replace(/ /g, "-")}</p>
                </div>
                <TagInput onChange={handleChange} id="tags"/>
                <div className='flex flex-row items-center mt-8'>
                    <label htmlFor="headerImg" className='text-xl mr-8'>Image:</label>
                    <input type="file" required={true} name="headerImg" onChange={handleChange} id='headerImg' className="file-input file-input-ghost grow border-black dark:border-white outline-none focus:outline-none" />
                </div>
                <textarea required={true} id="content" value={content} onChange={handleChange} placeholder='Content' className='input input-bordered bg-transparent border-black text-black dark:border-white dark:text-white outline-none focus:outline-none text-lg py-3 h-96 w-full mt-8'/>
                <button type='submit' className={'ml-auto btn btn-primary dark:text-black dark:bg-white dark:hover:text-black dark:hover:bg-white mt-8 min-h-fit' + (loading && 'btn-disabled')}>
                    {loading ? <Spinner /> : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default PostForm;