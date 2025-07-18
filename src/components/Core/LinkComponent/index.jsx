'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export const LinkComponent = ({ href, children, icon }) => {
    const pathname = usePathname()
    const isActive = pathname === href || pathname.startsWith(href)

    return (
        <Link href={href} className={`w-full flex items-center text-gray-200`}>
            <div
                className={`flex gap-2 items-center w-full py-2 px-4 cursor-pointer transition-colors hover:border-l-3 
        ${isActive ? 'font-bold text-gray-200 border-l-3 border-gray-200' : 'text-gray-200 hover:bg-[rgba(255,255,255,0.2)]'}`}
            >
                {icon}

                <span>{children}</span>
            </div>
            {isActive && <KeyboardArrowRightIcon  className='mr-3 text-gray-200'/>}

