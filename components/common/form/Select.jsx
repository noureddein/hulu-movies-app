import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
    return (
        <>
            <div className="form-group">
                <label className="mr-3" htmlFor={name}>{label}</label>
                <select name={name} id={name} {...rest} className="text-black outline-none rounded-lg p-1">
                    <option value="" />
                    {
                        options.map(option => (
                            <option className="text-black" key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))
                    }
                </select>
                {
                    // error && <div className="alert alert-danger">{error}</div>
                }
            </div>
        </>
    );
}

export default Select;