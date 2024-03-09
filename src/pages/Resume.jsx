import {useCallback, useEffect, useRef, useState} from 'react';
import JobEntry from "../components/JobEntry";
import Spinner from "../components/Spinner";
import {BsSortDown, BsSortUpAlt} from "react-icons/bs";
import Tag from "../components/Tag";
import tn from "../assets/projectAssets/tn.png"
import jt from "../assets/projectAssets/jt.png"
import {useNavigate, Link} from "react-router-dom";
import { Helmet } from 'react-helmet';
import ProjectCard from '../components/ProjectCard';
import PageScaffold from '../components/PageScaffold';

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

        let sanityQuery;
        if(filters.length > 0){
            sanityQuery = encodeURIComponent(`*[_type == "job" && count((tags[])[@ in [${filters.map((filter) => `"${filter}"`)}]]) > 0] | order(startMonth ${sortType})`);
        } else {
            sanityQuery = encodeURIComponent(`*[_type == "job"] | order(startMonth ${sortType})`);
        }

        const sanityURL = import.meta.env.VITE_SANITY_ENDPOINT + sanityQuery;
        const sanityResponse = await fetch(sanityURL);
        const sanityData = await sanityResponse.json();

        setJobs(sanityData.result);
        setLoading(false);
    }, [filters])

    useEffect(() => {
        fetchJobs().then();
    }, [fetchJobs])

    return (
        <PageScaffold extras='overflow-x-hidden'>
            <Helmet>
                <title>Chris Yates | Resume</title>
            </Helmet>
            <div className='flex flex-row'>
                <h1 className='text-5xl pb-4'>My Work</h1>
            </div>
            <div className='flex flex-col lg:flex-row pb-4 pt-4 gap-4'>
                <ProjectCard name="JT Hair" description="Site for JT Hair of Brighton, MI" logoStyle={{fontFamily: "JT", fontWeight: 'lighter'}} icon={jt} date="March 2023">
                    <a href='https://jthaircare.com/' className="mt-2 sm:mt-0 btn-wire">Visit Site</a>
                </ProjectCard>
                <ProjectCard name="Title Notes" description="Simple and stylish note-taking PWA" logoStyle={{fontFamily: "TN", fontWeight: '500'}} icon={tn} date="October 2022">
                    <button className="mt-2 sm:mt-0 btn-wire" onClick={() => {window.scrollTo(0, 0); navigate('/title-notes');}}>Learn More</button>
                </ProjectCard>
            </div>
            <div className="hero bg-transparent border-black dark:border-white rounded-3xl cursor-pointer mb-12" style={{border: '1px solid'}}>
                    <div className="hero-content flex-col items-start w-full" style={{maxWidth: "unset"}}>
                            <div className='flex flex-col sm:flex-row w-full justify-between items-center'>
                                <h1 className="text-2xl mb-2 sm:mb-0">Want To Work Together?</h1>
                                <Link to='/contact' className="mt-2 sm:mt-0 btn-wire w-full sm:w-auto">Let&apos;s Make Cool Stuff</Link>
                            </div>
                    </div>
                </div>
            <div className='flex flex-row'>
                <div className="flex flex-col pb-2">
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
                    return <JobEntry jobData={job} handleFilterPush={addFilter} key={i}/>
                })
            )}
        </PageScaffold>
    );
};

export default Resume;