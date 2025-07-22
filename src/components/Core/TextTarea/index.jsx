'use client';

export const Textarea = ({ white, className = '', ...props }) => {
    return (
        <textarea
            className={`
            border-solid p-2 w-full border-1 border-[#ccc] rounded-lg text-1xl ${className} ${white && 'placeholder:text-white text-white'}
        `}
            rows={4}
            {...props}
        />
    );
};
