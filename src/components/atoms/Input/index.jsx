export const Input = ({
    type = "text",
    value,
    onChange,
    placeholder,
    name,
    disabled = false,
    required = false,
    className = "",
}) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            required={required}
            className={`border border-gray-300 rounded px-3 py-2 ${className}`}
        />
    )
}
