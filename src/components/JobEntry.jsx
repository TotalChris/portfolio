import React from 'react';

const JobEntry = ({jobData}) => {

    const {company, startDate, endDate, title, responsibilities, tags, location, ongoing} = jobData

    const dateFormatter = Intl.DateTimeFormat("en-US", {month: '2-digit', year: "numeric"})

    return (
        <div className='text-md py-4' style={{fontFamily: 'Roboto Mono'}}>
            <div className='flex flex-row'>
                <h1 className='grow'><span className='font-bold'>{company}</span><span className='md:hidden'>&nbsp;/&nbsp;{title}</span></h1>
                <h1 className='text-neutral-500 text-right font-bold hidden md:block'>{dateFormatter.format(startDate.toDate()) + " - " + ( ongoing ? 'ongoing' : dateFormatter.format(endDate.toDate()) )}</h1>
            </div>
            <div className='flex flex-row'>
                <h1 className='grow hidden md:block'><span className=''> / {title}</span></h1>
                <h1 className='text-neutral-500 text-right hidden md:block'>{location}</h1>
            </div>
            <h1 className='text-neutral-500 font-bold block md:hidden'>{dateFormatter.format(startDate.toDate()) + " - " + ( ongoing ? 'ongoing' : dateFormatter.format(endDate.toDate()) )}</h1>
            <h1 className='text-neutral-500 block md:hidden'>{location}</h1>
            <div className='flex flex-row gap-2 mt-4 overflow-x-scroll w-screen relative -left-8 px-8'>
                {tags.map((tag) => {
                    return <div className="badge badge-outline min-w-max p-3 rounded-full text-black border-black dark:text-white dark:border-white hover:cursor-pointer">{tag}</div>
                })}
            </div>
            <ul className='text-sm list-disc ml-6 mt-4' style={{fontFamily: 'Inter'}}>
                {
                    responsibilities.map((pt) => {
                            return <li>{pt}</li>
                        }
                    )}
            </ul>
        </div>
    );
};

export default JobEntry;