export const Button = ({
    type = "button",
    onClick,
    disabled = false,
    children,
    variant = "primary",
    className = "",
}) => {

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-300 text-black hover:bg-gray-400",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };


    const style = `${variants[variant]} cursor-pointer px-4 py-2 rounded ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={style}>
            {children}
        </button>
    )
}
