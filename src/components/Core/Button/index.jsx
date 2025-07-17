import React from 'react'

export const Button = ({onClick, className, children, type='button'}) => {
    return (
        <button onClick={onClick} className={`hover:bg-[#ae7a64] ease-in-out duration-300 font-bold text-[#fff] rounded-lg cursor-pointer bg-[#66473b] p-2 w-full ${className}`} type={type}>
            {children}
        </button>
    )
}
