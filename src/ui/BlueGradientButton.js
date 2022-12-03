import React from "react"

const BlueGradientButton = (props) => {
    const border = {
        right: 'r-',
        left: 'l-',
        bottom: 'b-',
        top: 't-'
    };

    return (
        <button
            disabled={props.disabled}
            className={`rounded-${
                props.border != null ? border[props.border] : ''
            }lg disabled:transition-none disabled:from-gray-500 disabled:to-gray-500 bg-secBlue text-white p-3 text-lg transition-all ease-out duration-150 ${
                props.className
            } `}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default BlueGradientButton;
