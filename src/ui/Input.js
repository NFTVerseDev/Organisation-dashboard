import React from "react"

const Input = (props) => {
    return (
        <div className=" flex flex-col gap-1">
            <label className="text-lg font-semibold dark:text-gray-300 text-gray-700">{props.header}</label>
            <label className="text-base dark:text-gray-400 font-bold">{props.description}</label>
            {props.type === 'textarea' ? (
                <textarea
                    onChange={(e) => props.onChange(e)}
                    name={props.name}
                    disabled={props.disabled}
                    value={props.value}
                    className={`disabled:text-gray-500 dark:disabled:text-gray-400 border-gray-300 border rounded-lg dark:text-gray-100 dark:bg-darkPrimary dark:border-gray-700 bg-white hover:bg-slate-100 disabled:cursor-not-allowed disabled:hover:bg-slate-100 dark:hover:bg-gray-600 dark:disabled:hover:bg-zinc-700 transition-all ease-out duration-300 p-3 py-2 dark:focus:border-white focus:border-secPurple outline-none ${props.className}`}
                    placeholder={props.placeholder}
                />
            ) : (
                <input
                maxLength={props.maxLength}
                    onChange={(e) => props.onChange(e)}
                    name={props.name}
                    type={props.type}
                    disabled={props.disabled}
                    value={props.value}
                    className={`disabled:text-gray-500 dark:disabled:text-gray-400 border border-gray-300 rounded-lg dark:text-gray-100 dark:bg-darkPrimary dark:border-gray-700 bg-slate-white hover:bg-slate-100 disabled:cursor-not-allowed disabled:hover:bg-slate-100 dark:hover:bg-gray-600 dark:disabled:hover:bg-zinc-700 transition-all ease-out duration-300 p-3 py-2 dark:focus:border-white focus:border-secPurple outline-none ${props.className}`}
                    placeholder={props.placeholder}
                />
            )}
        </div>
    );
};

export default Input;
