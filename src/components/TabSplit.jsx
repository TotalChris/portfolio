import { useState } from "react";

const TabSplit = ({ options }) => {

    if(!options[0]?.key && !options[0]?.child){
        return <p className="text-red font-bold">The Options Prop</p>;
    }

    const [selected, setSelected] = useState(options[0].key)

    return (
        <>
            <div className="tabs tabs-bordered w-full mt-8 mb-2">
                {options.map((o) => {
                    return <button key={o.key} type="button" className={"tab dark:text-white border-black h-12 " + (selected === o.key && "tab-active dark:!border-white")} onClick={() => setSelected(o.key)}>{o.name}</button>;
                })}
            </div>
            {options.map((o) => {
                if(o.key === selected){
                    return o.child;
                } else {
                    return;
                } 
            })}
        </>
    )
}

export default TabSplit