'use client'
import Image from "next/image";
import { useState } from "react";

export const Avatar = ({
    src,
    alt = "avatar",
    width = 40,
    height = 40,
    fallbackSrc = "/fallback.png",
    className = "",
}) => {

    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            onError={() => setImgSrc(fallbackSrc)}
            className={className}
        />
    )
}
