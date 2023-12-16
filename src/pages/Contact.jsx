import React, {useState} from 'react';
import { useForm, ValidationError } from '@formspree/react';
import {useNavigate} from "react-router-dom";
import Spinner from "../components/Spinner";
const Contact = () => {

    const navigate = useNavigate()

    const [formState, formSubmit] = useForm("mknlolrg")

    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        inquiry: '',
    })

    const { name, contact, inquiry } = formData;

    const handleChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            }
        })
    }

    if(formState.succeeded){
        navigate('/contact/thank-you')
    }

    return (
        <div className='mx-6 pt-24'  style={{fontFamily: 'Roboto Mono'}}>
            <h1 className='text-6xl'>Contact Me</h1>
            <form method="POST" onSubmit={formSubmit} className='w-full md:max-w-screen-md'>
                <input type="hidden" name="form-name" value="contact" />
                <div className='flex flex-row gap-8 mt-8 w-full flex-wrap'>
                    <input type="text" name="name" id="name" value={name} onChange={handleChange} placeholder='name' className='input input-bordered bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none grow min-w-full md:min-w-0' />
                    <ValidationError prefix="Name" field="name" errors={formState.errors} />
                    <input type="text" name="contact" id="contact" value={contact} onChange={handleChange} placeholder='email or phone number' className='input input-bordered bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none grow min-w-full md:min-w-0' />
                    <ValidationError prefix="Contact" field="contact" errors={formState.errors} />
                </div>
                <div className='flex flex-row gap-8 mt-8'>
                    <textarea name="inquiry" id="inquiry" value={inquiry} onChange={handleChange} className="textarea w-full bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none h-64 md:h-32" placeholder="inquiry"></textarea>
                    <ValidationError prefix="Inquiry" field="inquiry" errors={formState.errors} />
                </div>
                <div className='flex flex-row gap-8 mt-8'>
                    <button type='submit' disabled={formState.submitting} className='ml-auto btn btn-primary dark:text-black dark:bg-white dark:hover:text-black dark:hover:bg-white rounded-full'>
                        {formState.submitting ? <Spinner /> : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Contact;