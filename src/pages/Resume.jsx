import React, {useEffect, useState} from 'react';
import JobEntry from "../components/JobEntry";
import {collection, query, getDocs, orderBy} from 'firebase/firestore'
import Spinner from "../components/Spinner";
import {db} from "../firebase.config";

const Resume = () => {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            const jobsRef = collection(db, 'jobs');
            const jobsQuery = await query(jobsRef, orderBy('startDate', "desc"));
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
        }
        fetchJobs();

    }, [])

    return (
        <div className='pt-24 mx-8'>
            <h1 className='text-5xl pb-4' style={{fontFamily: 'Roboto Mono'}}>My Resume</h1>
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