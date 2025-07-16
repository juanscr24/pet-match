export const Alert = ({
    type = "info",
    message,
    icon,
    closable = false,
    onClose,
    className = "",
}) => {

    const baseColors = {
        info: "text-blue-800 bg-blue-100",
        success: "text-green-800 bg-green-100",
        warning: "text-yellow-800 bg-yellow-100",
        error: "text-red-800 bg-red-100",
    };

    const style = `${baseColors[type] || baseColors.info} p-4 rounded flex items-center justify-between ${className}`;


    return (
        <div className={style}>
            <div className="flex items-center gap-2">
                {icon && <span>{icon}</span>}
                <span>{message}</span>
            </div>
            {closable && <button onClick={onClose}>✖</button>}
        </div>
    )
}
