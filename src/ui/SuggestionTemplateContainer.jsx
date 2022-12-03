import React, { useState } from 'react'

function SuggestionTemplateContainer(props) {
    const [selected,setSelected] = useState(false)
  return (
    <div className={`flex rounded-xl flex-col  dark:bg-darkSecondary shadow-lg p-3 gap-7 ${selected && "border-[#0B7663] border-2"}`}>
        <div className='flex px-2 py-4'>
            {
                props.children
            }
        </div>
        <div className='flex justify-end gap-7 items-baseline '>
            {/* <img src={props.image || "/logo.png"} alt="template" className='w-36 h-28 object-contain' /> */}
            <button className={`text-white border  px-10 rounded-md py-2 ${selected?"bg-[#0B7663]":"bg-secBlue"}`} onClick={()=>{props.setter(()=> !selected && props.children)
                setSelected(!selected);
            }}>{selected?" Selected" : "Select" }</button>
        </div>
    </div>
  )
}

export default SuggestionTemplateContainer