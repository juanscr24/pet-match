import React from 'react'

export const Input = ({name, type, value, onChange, placeholder, required, className, white}) => {
    return (
        <input
            name={name}
            type= {type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required = {required}
            className={`border-solid p-2 w-60 border-1 border-[#ccc] rounded-lg text-1xl ${className} ${white && 'placeholder:text-white text-white'}` }
        />
    )
}

