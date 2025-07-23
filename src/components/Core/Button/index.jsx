import React from 'react'

export const Button = ({onClick, className, children, type='button', fit}) => {
    // Se crea un componente generico de un boton
    return (
        <button onClick={onClick} className={`hover:bg-[#ae7a64] hover:ease-in-out ease-in-out duration-300 font-bold text-[#fff] rounded-lg cursor-pointer bg-[#66473b] p-2 ${fit ? 'w-fit, h-fit' : 'w-full'} ${className}`} type={type}>
            {children}
        </button>
    )
}
