import React from "react"

const BlueButton = (props) => {
    return (
        <button
            disabled={props.disabled}
            onClick={props.onClick}
            className={`${props.className} ${
                props.filled
                    ? 'bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:text-gray-800 disabled:dark:bg-zinc-600 disabled:dark:text-slate-50 disabled:dark:hover:border-zinc-600 disabled:dark:border-zinc-600  disabled-border-gray-300  disabled:hover:border-gray-300'
                    : '  disabled-border-gray-300  disabled:hover:border-gray-300  dark:text-slate-50'
            } px-4 py-2 rounded-lg transition-all ease-out duration-300`}
        >
            {props.name ? props.name : props.children}
        </button>
    );
};

export default BlueButton;
