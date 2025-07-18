'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PetsIcon from '@mui/icons-material/Pets'
import GroupIcon from '@mui/icons-material/Group'

export const LinkComponent = ({ href, children, profile, dashboard, match, pets, users }) => {
    const pathname = usePathname()
    const isActive = pathname === href || pathname.startsWith(href)

    return (
        <Link href={href} className={`w-full`}>
            <div
                className={`flex gap-2 items-center w-full rounded-md py-2 px-4 cursor-pointer transition-colors hover:bg-amber-300
        ${isActive ? 'font-bold text-black' : 'text-gray-700 hover:text-gray-900 hover:bg-amber-200'}`}
            >
                {profile && <AccountCircleIcon />}
                {dashboard && <DashboardCustomizeIcon />}
                {match && <FavoriteIcon />}
                {pets && <PetsIcon />}
                {users && <GroupIcon />}

                <span>{children}</span>
            </div>
        </Link>
    )
}
