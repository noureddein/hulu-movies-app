import React from 'react';
import Joi from 'joi-browser';
import Input from './Input';
import Select from './Select';

class Form extends React.Component {
    state = {
        data: {},
        errors: {}
    }

    validate = () => {
        const { error } = Joi.validate(this.state.data, this.schema, { abortEarly: false })
        if (!error) return null
        const errors = {}
        error.details.map(item => errors[item.path[0]] = item.message)
        return errors
    }

    handleForm = e => {
        e.preventDefault()
        const errors = this.validate()
        this.setState({ errors: errors || {} })
        if (errors) return
        this.doSubmit()
    }

    validateProperty = ({ value, name }) => {
        const obj = { [name]: value }
        const schema = { [name]: this.schema[name] }
        const { error } = Joi.validate(obj, schema)
        return !error ? null : error.details[0].message
    }



    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(input)
        if (errorMessage) errors[input.name] = errorMessage
        else delete errors[input.name]

        const data = { ...this.state.data }
        data[input.name] = input.value
        this.setState({ data, errors })
    }

    renderButton = (label, btnStyle) => {
        return <button className={`${btnStyle}`} disabled={this.validate()} >{label}</button>
    }

    renderInput = (name, label, type = 'text', placeholder = '', inputContainerStyle, input_ele) => {
        const { data, errors } = this.state
        return (
            <Input
                name={name}
                label={label}
                value={data[name]}
                onChange={this.handleChange}
                type={type}
                error={errors[name]}
                placeholder={placeholder}
                inputContainerStyle={inputContainerStyle}
                input_ele={input_ele}
            />
        )
    }

    renderSelect = (name, label, options) => {
        const { data, errors } = this.state
        return (
            <Select
                name={name}
                label={label}
                value={data[name]}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        )
    }

}

export default Form;