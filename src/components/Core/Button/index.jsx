import React from 'react'

export const Button = ({onClick, className, children, type='button'}) => {
    return (
        <button onClick={onClick} className={className} type={type}>
            {children}
        </button>
    )
}
