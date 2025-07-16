import React from 'react'

export const Label = ({
    htmlFor,
    children,
    className = "",
    color = "text-gray-700",
    weight = "font-medium",
}) => {
    return (
        <label htmlFor={htmlFor} className={`${color} ${weight} ${className}`}>
            {children}
        </label>
    )
}
