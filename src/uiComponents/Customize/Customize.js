import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'

export const Customize = () => {
  return (
    <div className="flex flex-row w-screen">
    <Sidebar />
    <div className="overflow-y-scroll ml-[75px] md:ml-[0px] dark:bg-darkPrimary bg-slate-50  w-screen h-screen pt-[110px] p-10 py-8 ">
        {/*{props.children}*/}
        <Outlet />
        
    </div>
</div>
  )
}
