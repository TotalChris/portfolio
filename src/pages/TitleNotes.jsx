import React from 'react';
import {BsArrowDownCircle, BsArrowUpRightCircle} from "react-icons/bs";
import tnIcon from "../assets/projectAssets/tn.png"
import tnSpread from "../assets/titlenew.png"
import tnFeature1 from "../assets/title-feature-1-new.png"
import tnFeature2 from "../assets/title-feature-2-new.png"


const TitleNotes = () => {
    return (
        <div style={{fontFamily: 'TN'}}>
            <div className="flex flex-col lg:flex-row overflow-hidden mt-20">
                <div className="hero min-h-fit py-10 bg-neutral-100 dark:bg-black text-black dark:text-white w-full lg:w-1/2 lg:min-h-screen">
                    <div className="hero-content px-5 pb-0 flex-col">
                        <div className="flex">
                            <div className="max-w-md text-center">
                                <h1>
                                    <img src={tnIcon} alt="Title Notes logo" className="w-24 rounded-3xl mx-auto"/>
                                </h1>
                                <h1 className="mt-5 text-5xl font-bold text-center">Title Notes</h1>
                                <p className="my-5 text-center">The notes app designed to live in your browser.</p>
                                <a href="#colors" className="btn btn-primary hover:border-black hover:bg-black hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black bg-transparent border-black text-black dark:text-white dark:border-white rounded-2xl mr-2">Learn More&nbsp;<BsArrowDownCircle /></a>
                                <a href='https://titlenotes.netlify.app/' className="btn btn-primary border-black bg-black text-white dark:border-white dark:bg-white dark:text-black rounded-2xl ml-2">Check it out&nbsp;<BsArrowUpRightCircle /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-neutral-100 dark:bg-black w-full lg:w-1/2 flex">
                    <img src={tnSpread} alt="A screenshot of Title Notes" className="self-center mx-auto drop-shadow-2xl w-2/3 h-2/3 lg:self-end lg:w-auto mg:mt-5" style={{borderRadius: '0.5rem 0.5rem 0 0', objectFit: 'cover', objectPosition: '0 0'}}></img>
                </div>
            </div>

            <div className="p-10 bg-neutral-100 dark:bg-black text-black dark:text-white" >
                <div className="p-5 hero rounded-3xl border-black dark:border-white" style={{border: "1px solid"}}>
                    <div className="hero-content flex-col md:flex-row-reverse">
                        <img src={tnFeature1} alt="Custmizing a List in Title Notes" className="max-w-sm rounded-lg shadow-2xl w-1/2 lg:w-full" />
                        <div className="mt-10 md:mr-10 max-w-md">
                            <h1 className="text-5xl font-bold">Colorful. Just like your ideas.</h1>
                            <p className="py-6">Title has a vivid selection of colors and icons for your lists. Color reaches into the UI of each list and note.</p>
                            <a href='https://titlenotes.netlify.app/' className="btn btn-primary border-black bg-black text-white dark:border-white dark:bg-white dark:text-black hover:bg-transparent hover:border-black hover:text-black dark:hover:text-white dark:hover:border-white rounded-2xl">Paint the town&nbsp;<BsArrowUpRightCircle /></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pb-10 px-10 bg-neutral-100 dark:bg-black text-black dark:text-white" >
                <div className="p-5 hero rounded-3xl border-black dark:border-white" style={{border: "1px solid"}}>
                    <div className="hero-content flex-col md:flex-row">
                        <img src={tnFeature2} alt="A Shopping List in Title Notes" className="max-w-sm rounded-lg shadow-2xl w-1/2 lg:w-full" />
                        <div className="mt-10 md:ml-10 max-w-md">
                            <h1 className="text-5xl font-bold">Your shopping, from start to finish</h1>
                            <p className="py-6">Notes you write in Title can be checked off when you're done with a task, making Title the perfect notes/to-do list hybrid.</p>
                            <a href='https://titlenotes.netlify.app/' className="btn btn-primary border-black bg-black text-white dark:border-white dark:bg-white dark:text-black hover:bg-transparent hover:border-black hover:text-black dark:hover:text-white dark:hover:border-white rounded-2xl">Git 'er done&nbsp;<BsArrowUpRightCircle /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TitleNotes;