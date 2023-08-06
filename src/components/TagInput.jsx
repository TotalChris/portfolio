import React, {useEffect, useRef, useState} from 'react';
import Tag from "./Tag";

const TagInput = ({onChange, id}) => {

    const inputField = useRef();

    const [tagList, setTagList] = useState([]);
    const [currentTag, setCurrentTag] = useState('');

    useEffect(() => {
        let e = {
            target: {
                id: id,
                value: tagList,
            }
        }
        onChange && onChange(e);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tagList])

    const addTag = (tag) => {
        let t = tag.trim().toLowerCase().replace(/ /g, "-");
        setTagList((prevState) => {
            return [...prevState, t];
        });
    }

    const removeTag = (text) => {
        let listCopy = tagList
        listCopy.splice(listCopy.indexOf(text), 1);
        setTagList([...listCopy]);
    }

    const handleTagClick = (e) => {

    }

    const handleChange = (e) => {
        setCurrentTag(e.target.value);
    }

    const handleKey = (e) => {
        if(e.keyCode === 13 && currentTag.length > 2){
            addTag(currentTag);
            setCurrentTag('');
        } else {
            if(e.keyCode === 8 && currentTag.length === 0){
                removeTag(tagList[tagList.length - 1]);
            }
        }
    }

    function handleFocus(e) {
        inputField.current.focus();
    }

    return (
        <div className='flex flex-row items-center gap-2 border-black dark:border-white py-2 cursor-text pl-4 rounded-lg' onClick={handleFocus} style={{border: '1px solid'}}>
            {
                (tagList.length === 0
                        ?
                        <p className={'absolute text-neutral-600 dark:text-neutral-400 text-lg ' + ((currentTag.length > 0 || tagList.length > 0) && 'hidden')}>Tags</p>
                        :
                        tagList.map((t, i) => {
                            return <Tag key={i} text={t} handleClick={handleTagClick} handleRemove={removeTag} removable={true}/>
                        })
                )

            }
            <input type='text' ref={inputField} value={currentTag} className='input pl-0 h-8 input-bordered bg-transparent border-transparent text-black dark:text-white outline-none focus:outline-none focus:border-none' onChange={handleChange} onKeyDown={handleKey}/>
        </div>
    );
};

export default TagInput;