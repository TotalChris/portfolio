import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Spinner from "../components/Spinner";
const Contact = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        inquiry: '',
    })

    const [loading, setLoading] = useState(false);

    const { name, contact, inquiry } = formData;

    const handleChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("https://chrisyates.dev/api/contact", {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            throw new Error('Invalid Response From Server. ' + res.body)
        } catch (e) {
            navigate(`/contact/error?msg=${e.message}`);
        } finally {
            navigate('/contact/thank-you')
        }
    }

    return (
        <div className='mx-6 pt-24'  style={{fontFamily: 'Roboto Mono'}}>
            <h1 className='text-6xl'>Contact Me</h1>
            <form onSubmit={handleSubmit} className='w-full md:max-w-screen-md'>
                <input type="hidden" name="form-name" value="contact" />
                <div className='flex flex-row gap-8 mt-8 w-full flex-wrap'>
                    <input type="text" name="name" id="name" value={name} onChange={handleChange} placeholder='name' className='input input-bordered bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none grow min-w-full md:min-w-0' />
                    <input type="text" name="contact" id="contact" value={contact} onChange={handleChange} placeholder='email or phone number' className='input input-bordered bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none grow min-w-full md:min-w-0' />
                </div>
                <div className='flex flex-row gap-8 mt-8'>
                    <textarea name="inquiry" id="inquiry" value={inquiry} onChange={handleChange} className="textarea w-full bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none h-64 md:h-32" placeholder="inquiry"></textarea>
                </div>
                <div className='flex flex-row gap-8 mt-8'>
                    <button type='submit' disabled={loading} className='ml-auto btn btn-primary dark:text-black dark:bg-white dark:hover:text-black dark:hover:bg-white rounded-full'>
                        {loading ? <Spinner /> : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Contact;