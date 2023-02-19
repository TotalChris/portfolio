import React, {useCallback, useEffect, useState} from 'react';
import JobEntry from "../components/JobEntry";
import {collection, query, getDocs, orderBy} from 'firebase/firestore'
import Spinner from "../components/Spinner";
import {db} from "../firebase.config";
import {BsSortDown, BsSortUpAlt} from "react-icons/bs";

const Resume = () => {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        const jobsRef = collection(db, 'jobs');
        const jobsQuery = await query(jobsRef, orderBy('startDate', 'desc'));
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
    }, [])

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs])

    return (
        <div className='pt-24 px-8'>
            <div className='flex flex-row'>
                <h1 className='text-5xl pb-4' style={{fontFamily: 'Roboto Mono'}}>My Resume</h1>
                <label className="swap swap-rotate ml-auto">
                    <input type="checkbox" onChange={(e) => {
                        setJobs((prevState) => {
                            let copy = [...prevState];
                            return copy.reverse();
                        }
                    )}}/>
                    <BsSortUpAlt className='swap-on fill-black dark:fill-white w-12 h-12' />
                    <BsSortDown className='swap-off fill-black dark:fill-white w-12 h-12' />
                </label>
            </div>

            <hr className='border-black dark:border-white' />
            {(loading ? (
                <Spinner />
            ) :
                jobs.map((job) => {
                    return <JobEntry jobData={job.data} />
                })
            )}
        </div>
    );
};

export default Resume;