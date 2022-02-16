import React from 'react';

const Input = ({ input_ele, inputContainerStyle, name, label, error, ...rest }) => {
    return (
        <div className={`${inputContainerStyle}`}>
            <label htmlFor={name} className=''>{label}</label>
            <input
                {...rest}
                name={name}
                id={name}
                className={input_ele}
            />
            {error && <div className=" text-center text-red-500">{error}</div>}
        </div>
    );
}

export default Input;

