import React from 'react';

export const Button = ({ onClick, className = '', children, type = 'button', fit }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`hover:bg-[#ae7a64] ease-in-out duration-300 font-bold text-white rounded-lg cursor-pointer bg-[#66473b] p-2 ${fit ? 'w-fit' : 'w-full'} ${className}`}
        >
            {children}
        </button>
    );
};
