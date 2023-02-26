import React, {useCallback, useEffect, useRef, useState} from 'react';
import JobEntry from "../components/JobEntry";
import {collection, query, getDocs, orderBy, where} from 'firebase/firestore'
import Spinner from "../components/Spinner";
import {db} from "../firebase.config";
import {BsSortDown, BsSortUpAlt} from "react-icons/bs";
import Tag from "../components/Tag";

const Resume = () => {

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
        fetchJobs();
    }, [fetchJobs])

    return (
        <div className='pt-24 px-8'>
            <div className='flex flex-row'>
                <h1 className='text-5xl pb-4' style={{fontFamily: 'Roboto Mono'}}>My Resume</h1>
                <label className="swap swap-rotate ml-auto">
                    <input type="checkbox" ref={sortBox} onChange={(e) => {
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