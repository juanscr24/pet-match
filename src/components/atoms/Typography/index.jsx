export const Typography = ({
    as = "p",
    variant = "body",
    color = "text-black",
    weight = "font-normal",
    children,
    className = "",
}) => {
    const Tag = as;

    const variants = {
        title: "text-3xl font-bold",
        subtitle: "text-xl font-semibold",
        body: "text-base",
        caption: "text-sm",
    };

    const style = `${variants[variant]} ${color} ${weight} ${className}`;

    return (
        <Tag className={style}>{children}</Tag>
    )
}
