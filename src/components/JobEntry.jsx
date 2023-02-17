import React, {useState} from 'react';
import Spinner from "./Spinner";

const JobEntry = ({jobData}) => {

    const {company, startDate, endDate, location, title, responsibilities} = jobData

    const dateFormatter = Intl.DateTimeFormat("en-US", {month: 'long', year: "numeric"})

    return (
        <div className='text-2xl py-4' style={{fontFamily: 'Roboto Mono'}}>
            <div className='flex flex-row'>
                <h1 className='grow'><span className='font-bold'>{company.toLowerCase()}</span><span
                    className=''> / {title.toLowerCase()}</span></h1>
                <h1 className='text-neutral-500'>{dateFormatter.format(startDate.toDate()).toLowerCase() + " - " + dateFormatter.format(endDate.toDate()).toLowerCase()}</h1>
            </div>
            <ul className='text-xl list-disc ml-6 mt-4' style={{fontFamily: 'Inter'}}>
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