import React from 'react'

export const Input = ({type, value, onChange, placeholder, required, className}) => {
    return (
        <input
            type= {type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required = {required}
            className={className}
        />
    )
}
