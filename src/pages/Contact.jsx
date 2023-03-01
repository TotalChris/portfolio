import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
const Contact = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        inquiry: '',
    })

    const { name, contact, inquiry } = formData;

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", ...formData })
        })
            .then(() =>
                navigate('/contact/thank-you')
            )
            .catch(error => alert(error));
    };

    const handleChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            }
        })
    }

    return (
        <div className='mx-6 pt-24'  style={{fontFamily: 'Roboto Mono'}}>
            <h1 className='text-6xl'>Contact Me</h1>
            <form netlify method="POST" onSubmit={handleSubmit} className='w-full md:max-w-screen-md'>
                <input type="hidden" name="form-name" value="contact" />
                <div className='flex flex-row gap-8 mt-8 w-full flex-wrap'>
                    <input type="text" name="name" id="name" value={name} onChange={handleChange} placeholder='name' className='input input-bordered bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none grow min-w-full md:min-w-0' />
                    <input type="text" name="contact" id="contact" value={contact} onChange={handleChange} placeholder='email or phone number' className='input input-bordered bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none grow min-w-full md:min-w-0' />
                </div>
                <div className='flex flex-row gap-8 mt-8'>
                    <textarea name="inquiry" id="inquiry" value={inquiry} onChange={handleChange} className="textarea w-full bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none h-64 md:h-32" placeholder="inquiry"></textarea>
                </div>
                <div className='flex flex-row gap-8 mt-8'>
                    <button type='submit' className='ml-auto btn btn-primary dark:text-black dark:bg-white dark:hover:text-black dark:hover:bg-white rounded-full'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Contact;