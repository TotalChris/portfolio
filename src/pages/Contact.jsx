import React, {useState} from 'react';
import { useForm, ValidationError } from '@formspree/react';
import {useNavigate} from "react-router-dom";
import Spinner from "../components/Spinner";
import { Link } from 'react-router-dom';
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
        <div className='pt-24 mx-auto px-8' style={{fontFamily: 'Roboto Mono', maxWidth: '1080px'}}>
            <h1 className='text-6xl'>Contact Me</h1>
            <form method="POST" onSubmit={formSubmit} className='w-full'>
            <p className='text-xl mt-8'>Feel free to reach out to me with any potential projects or employment opportunites that you think would fit my skill set!</p><br/><p> If you want more info about my existing work, check out my <Link to='/resume' className='underline hover:cursor-pointer'>resume</Link>.</p>

                <input type="hidden" name="form-name" value="contact" />
                <div className='flex flex-row gap-8 mt-8 w-full flex-wrap'>
                    <input type="text" name="name" id="name" value={name} onChange={handleChange} placeholder='Name / Company' className='input input-bordered bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none focus:border-black focus:dark:border-white grow min-w-full md:min-w-0' />
                    <ValidationError prefix="Name" field="name" errors={formState.errors} />
                    <input type="text" name="contact" id="contact" value={contact} onChange={handleChange} placeholder='Email or Phone Number' className='input input-bordered bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none focus:border-black focus:dark:border-white grow min-w-full md:min-w-0' />
                    <ValidationError prefix="Contact" field="contact" errors={formState.errors} />
                </div>
                <div className='flex flex-row gap-8 mt-8'>
                    <textarea name="inquiry" id="inquiry" value={inquiry} onChange={handleChange} className="textarea w-full bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none h-64 md:h-48 focus:border-black focus:dark:border-white" placeholder="Inquiry"></textarea>
                    <ValidationError prefix="Inquiry" field="inquiry" errors={formState.errors} />
                </div>
                <div className='flex flex-row gap-8 mt-8'>
                    <button type='submit' disabled={formState.submitting} className='ml-auto btn btn-primary border-none dark:text-black dark:bg-white dark:hover:text-black dark:hover:bg-white rounded-2xl'>
                        {formState.submitting ? <Spinner /> : 'Send'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Contact;