import { useSelector } from 'react-redux';
import React from "react"

const ModalOverlay = (props) => {
    const appCtx = useSelector((state) => state.app);

    return (
        <div
            className={`${
                appCtx.isDarkMode && 'dark'
            } flex justify-center items-center absolute z-50 dark:bg-gray-600/50 bg-gray-800/50 w-screen h-screen top-0 left-0 overflow-y-scroll ${
                props.className
            }`}
        >
            <div className="rounded p-5 grid gap-5  mx-auto dark:bg-slate-800 bg-gray-100 border-2 dark:border-gray-500">
                {props.children}
            </div>
        </div>
    );
};

export default ModalOverlay;
