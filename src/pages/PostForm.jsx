import {useContext, useEffect, useRef, useState} from 'react';
import TagInput from "../components/TagInput";
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {db} from "../firebase.config";
import {useNavigate} from "react-router-dom";
import Loading from "../components/Loading";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import PageScaffold from '../components/PageScaffold';
import { AuthContext } from '../context/AuthProvider'
import TabSplit from '../components/TabSplit';

const PostForm = () => {
    const {currentUser, authLoaded} = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const parser = new MarkdownIt();
    const formRef = useRef();
    const MdEditorRef = useRef();
    const storage = getStorage();
    const [editMode, setEditMode] = useState('editor');
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        tags: [],
        headerImg: undefined,
        content: '',
        markdownFile: undefined,
        isPrivate: false,
    })

    const {title, subtitle, headerImg} = formData;

    useEffect(() => {
        if(authLoaded){
            if (currentUser) {
                setFormData({...formData, userRef: currentUser.uid})
            } else {
                navigate('/log-in')
            } 
        }
    }, [authLoaded, currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let formDataCopy = {...formData, header: '', timestamp: serverTimestamp()};
        try{
            const snapshot = await uploadBytes(ref(storage, crypto.randomUUID()), headerImg)
            formDataCopy.header = await getDownloadURL(snapshot.ref);
            delete formDataCopy.headerImg;

            if(editMode === "upload"){
               formDataCopy.content = await formDataCopy.markdownFile.text();
            }
            delete formDataCopy.markdownFile;
            await setDoc(doc(db, 'posts', title.trim().toLowerCase().replace(/ /g, "-")), formDataCopy);
            navigate('/posts/' + title.trim().toLowerCase().replace(/ /g, "-"))
        } catch (e) {
            console.log(e);
        }
    }

    const handleChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: (e.target.id === 'headerImg' || e.target.id === 'markdownFile' ? e.target.files[0] : e.target.value),
            }
        })
    };

    const handleEditorChange = ({ text }) => {
        handleChange({
            target: {
                id: 'content',
                value: text,
            }
        })
    }

    const handleEnter = (e) => {
        // && e.target !== MdEditorRef.current
        if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) {
            e.preventDefault()
        }
    }

    return (
        <PageScaffold>
            <h1 className='text-5xl'>Write a Post</h1>
            <form className='py-12 flex flex-col' onKeyDown={handleEnter} onSubmit={handleSubmit} ref={formRef}>
                <div className={'collapse group ' + (title.length > 0 && 'collapse-open')} style={{borderRadius: 0}}>
                    <input required={true} id="title" value={title} onChange={handleChange} type='text' placeholder='Title' className='input rounded-2xl bg-transparent border-black text-black dark:border-white dark:text-white outline-none focus:outline-none focus:border-black focus:dark:border-white text-2xl py-3 h-auto w-full' style={{borderBottom: "none", borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}/>
                    <input required={true} id="subtitle" value={subtitle} onChange={handleChange} type='text' placeholder='Subtitle' className='input rounded-2xl bg-transparent border-black text-black dark:border-white dark:text-white outline-none focus:outline-none focus:border-black focus:dark:border-white text-lg py-3 h-auto w-full' style={{borderTop: "none", borderTopRightRadius: 0, borderTopLeftRadius: 0}}/>
                    <p className='collapse-content break-words mt-2' style={{gridRowStart: 3}}>Your post will live at https://chrisyates.dev/posts/{title.trim().toLowerCase().replace(/ /g, "-")}</p>
                </div>
                <TagInput onChange={handleChange} id="tags"/>
                <div className='flex flex-row items-center mt-8 gap-4'>
                    <label htmlFor="headerImg" className='text-xl'>Thumbnail:</label>
                    <input type="file" name="headerImg" onChange={handleChange} id='headerImg' className="file-input file-input-ghost grow border-black dark:border-white outline-none focus:outline-none rounded-2xl" />
                </div>
                <div className='flex flex-row items-start mt-8 gap-4'>
                    <input type="checkbox" className='checkbox checkbox-lg border-white [--chkbg:white]' name='isPrivate' id='isPrivate' onChange={handleChange}/>
                    <label htmlFor="isPrivate" className='text-xl'>Make Private</label>
                </div>
                <TabSplit stateArray={[editMode, setEditMode]} options={[
                    {
                        key: 'editor', 
                        name: 'Manual Input',
                        child: (
                            <MdEditor ref={MdEditorRef} style={{ width: '100%', height: '500px' }} renderHTML={text => parser.render(text)} onChange={handleEditorChange} />
                        )
                    },
                    {
                        key: 'upload',
                        name: 'File Upload',
                        child: (
                            <div className='flex flex-col items-center mt-8'>
                                <label htmlFor="markdownFile" className='text-xl w-full'>Markdown or Text File:</label>
                                <input type="file" name="markdownFile" accept=".md,.txt" onChange={handleChange} id='markdownFile' className="file-input file-input-ghost grow border-black dark:border-white outline-none focus:outline-none w-full mt-4" />
                            </div> 
                        )
                    }
                ]} />
                <button type='submit' className={'ml-auto btn-wire mt-8 min-h-fit' + (loading && 'btn-disabled')}>
                    {loading ? <Loading /> : 'Submit'}
                </button>
            </form>
        </PageScaffold>
    );
};

export default PostForm;