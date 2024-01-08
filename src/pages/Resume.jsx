import React, {useCallback, useEffect, useRef, useState} from 'react';
import JobEntry from "../components/JobEntry";
import {collection, query, getDocs, orderBy, where} from 'firebase/firestore'
import Spinner from "../components/Spinner";
import {db} from "../firebase.config";
import {BsSortDown, BsSortUpAlt} from "react-icons/bs";
import Tag from "../components/Tag";
import tn from "../assets/projectAssets/tn.png"
import jt from "../assets/projectAssets/jt.png"
import {useNavigate, Link} from "react-router-dom";

const Resume = () => {

    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const sortBox = useRef();

    const [filters, setFilters] = useState([]);

    const addFilter = (text) => {
        if(!filters.includes(text)){
            setFilters((prevState) => {
                return [...prevState, text]
            })
        }
    }
    const removeFilter = (filter) => {
        setFilters((prevState) => {
            return prevState.filter((f) => f !== filter);
        })
    }

    const fetchJobs = useCallback(async () => {
        setLoading(true);

        const sortType = (sortBox.current.checked ? 'asc' :  'desc')

        const jobsRef = collection(db, 'jobs');
        let jobsQuery;
        if(filters.length > 0){
            jobsQuery = await query(jobsRef, orderBy('startDate', sortType), where('tags', 'array-contains-any', filters));
        } else {
            jobsQuery = await query(jobsRef, orderBy('startDate', sortType));
        }
        const jobsSnap = await getDocs(jobsQuery);

        const jobs = []

        jobsSnap.forEach((doc) => {
            return jobs.push({
                id: doc.id,
                data: doc.data(),
            })
        })

        setJobs(jobs);
        setLoading(false);
    }, [filters])

    useEffect(() => {
        fetchJobs().then();
    }, [fetchJobs])

    return (
        <div className='pt-24 px-4 mx-auto' style={{maxWidth: '1080px'}}>
            <div className='flex flex-row'>
                <h1 className='text-5xl pb-4' style={{fontFamily: 'Roboto Mono'}}>My Work</h1>
            </div>
            <hr className='border-black dark:border-white'/>
            <div className='flex flex-col lg:flex-row pb-4 pt-4 gap-4'>
                <div className="hero bg-transparent border-black dark:border-white rounded-3xl cursor-pointer" style={{border: '1px solid'}}>
                    <div className="hero-content flex-col items-start w-full" style={{maxWidth: "unset"}}>
                        <div className="flex gap-4 sm:flex-col flex-row justify-between items-center sm:items-start w-full">
                            <img src={jt} className='h-16 w-16 rounded-2xl' alt="JT Hair icon"></img>
                            <h1 className="text-5xl font-bold" style={{fontFamily: "JT", fontWeight: 'lighter'}}>JT Hair</h1>
                        </div>
                            <div className='flex flex-col sm:flex-row w-full justify-between' style={{fontFamily: 'Roboto Mono'}}>
                                <div className="flex flex-col">
                                    <p>Site for JT Hair of Brighton, MI</p>
                                    <p className='text-neutral-500'>March 2023</p>
                                </div>
                                <a href='https://jthaircare.com/' className="mt-2 sm:mt-0 btn-wire">Visit Site</a>
                            </div>
                    </div>
                </div>
                <div className="hero bg-transparent border-black dark:border-white rounded-3xl cursor-pointer" style={{border: '1px solid'}}>
                    <div className="hero-content flex-col items-start w-full" style={{maxWidth: "unset"}}>
                        <div className="flex gap-4 sm:flex-col flex-row justify-between items-center sm:items-start w-full">
                            <img src={tn} className='h-16 w-16 rounded-2xl' alt="Title Notes icon"></img>
                            <h1 className="text-4xl" style={{fontFamily: "TN"}}>Title Notes</h1>
                        </div>
                            <div className='flex flex-col sm:flex-row w-full justify-between' style={{fontFamily: 'Roboto Mono'}}>
                                <div className="flex flex-col">
                                    <p>Simple and stylish note-taking PWA</p>
                                    <p className='text-neutral-500'>October 2022</p>
                                </div>
                                <button className="mt-2 sm:mt-0 btn-wire" onClick={() => {window.scrollTo(0, 0); navigate('/title-notes');}}>Learn More</button>
                            </div>
                    </div>
                </div>
            </div>
            <div className="hero bg-transparent border-black dark:border-white rounded-3xl cursor-pointer mb-12" style={{border: '1px solid'}}>
                    <div className="hero-content flex-col items-start w-full" style={{maxWidth: "unset"}}>
                            <div className='flex flex-col sm:flex-row w-full justify-between items-center' style={{fontFamily: 'Roboto Mono'}}>
                                <h1 className="text-2xl mb-2 sm:mb-0" style={{fontFamily: 'Roboto Mono'}}>Want To Work Together?</h1>
                                <Link to='/contact' className="mt-2 sm:mt-0 btn-wire w-full sm:w-auto">Let's Make Cool Stuff</Link>
                            </div>
                    </div>
                </div>
            <div className='flex flex-row'>
                <div className="flex flex-col pb-2" style={{fontFamily: 'Roboto Mono'}}>
                    <h1 className='text-5xl pb-2'>My Resume</h1>
                    <p className='text-lg italic'>Click a category tag to filter</p>
                </div>
                <label className="swap swap-rotate ml-auto">
                    <input type="checkbox" ref={sortBox} onChange={() => {
                        setJobs((prevState) => {
                            let copy = [...prevState];
                            return copy.reverse();
                        }
                    )}}/>
                    <BsSortUpAlt className='swap-on fill-black dark:fill-white w-12 h-12' />
                    <BsSortDown className='swap-off fill-black dark:fill-white w-12 h-12' />
                </label>
            </div>

            <hr className='border-black dark:border-white'/>

            {(filters.length > 0 &&
                <div className='flex flex-row my-2 gap-2'>
                    <p className='text-lg mr-2'>Filters:</p>
                    {filters.map((filter, i) => {
                        return <Tag text={filter} handleRemove={() => {removeFilter(filter)}} removable={true} key={i} className="tag-invert"/>
                    })}
                </div>
            )}
            {(loading ? (
                <Spinner />
            ) :
                jobs.map((job, i) => {
                    return <JobEntry jobData={job.data} handleFilterPush={addFilter} key={i}/>
                })
            )}
        </div>
    );
};

export default Resume;