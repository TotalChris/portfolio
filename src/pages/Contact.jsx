import {useState} from 'react';
import { useForm, ValidationError } from '@formspree/react';
import {useNavigate} from "react-router-dom";
import Spinner from "../components/Spinner";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PageScaffold from '../components/PageScaffold';
const Contact = () => {

    const navigate = useNavigate()

    const [formState, formSubmit] = useForm("mknlolrg")

    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        inquiry: '',
    })

    const [error, setError] = useState(false)

    const { name, contact, inquiry } = formData;

    const handleChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.name.length > 3 && formData.contact.length > 5 && formData.inquiry.length > 30){
            formSubmit(e).then()
        } else {
            setError(true)
        }
    }

    if(formState.succeeded){
        navigate('/contact/thank-you');
    }

    return (
        <PageScaffold>
            <Helmet>
                <title>Chris Yates | Contact</title>
            </Helmet>
            <h1 className='text-5xl'>Contact Me</h1>
            <form method="POST" onSubmit={handleSubmit} onFocus={() => {setError(false)}} className='w-full'>
            <p className='text-xl mt-8'>Feel free to reach out to me with any potential projects or employment opportunites that you think would fit my skill set!</p><br/><p> If you want more info about my existing work, check out my <Link to='/resume' className='underline hover:cursor-pointer'>resume</Link>.</p>

                <input type="hidden" name="form-name" value="contact" />
                <div className='flex flex-row gap-4 mt-8 w-full flex-wrap'>
                    <input type="text" name="name" id="name" value={name} onChange={handleChange} placeholder='Name / Company' className='input bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none focus:border-black focus:dark:border-white grow min-w-full md:min-w-0 rounded-2xl' />
                    <ValidationError prefix="Name" field="name" errors={formState.errors} />
                    <input type="text" name="contact" id="contact" value={contact} onChange={handleChange} placeholder='Email or Phone Number' className='input bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none focus:border-black focus:dark:border-white grow min-w-full md:min-w-0 rounded-2xl' />
                    <ValidationError prefix="Contact" field="contact" errors={formState.errors} />
                </div>
                <div className='flex flex-row gap-8 mt-4'>
                    <textarea name="inquiry" id="inquiry" value={inquiry} onChange={handleChange} className="rounded-2xl textarea w-full bg-transparent border-black text-black dark:border-white dark:text-white focus:outline-none h-64 md:h-48 focus:border-black focus:dark:border-white" placeholder="Inquiry"></textarea>
                    <ValidationError prefix="Inquiry" field="inquiry" errors={formState.errors} />
                </div>
                <div className={ 'w-full flex flex-row gap-8 mt-4 collapse ' + (error ? 'collapse-open' : '') }>
                    <div className='collapse-content text-red-700 my-auto p-0 flex-grow'>
                        Your information isn&apos;t complete. Try again.
                    </div>
                    <button type='submit' disabled={formState.submitting} className='ml-auto btn-wire'>
                        {formState.submitting ? <Spinner /> : 'Send'}
                    </button>
                </div>
            </form>
        </PageScaffold>
    );
};

export default Contact;