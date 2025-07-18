import Link from 'next/link'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PetsIcon from '@mui/icons-material/Pets';
import GroupIcon from '@mui/icons-material/Group';

export const LinkComponent = ({ href, children, profile, dashboard, match, pets, users }) => {
    return (
        <div className='flex gap-2 hover:text-gray-500 cursor-pointer'>
            {profile && <AccountCircleIcon />}
            {dashboard && <DashboardCustomizeIcon />}
            {match && <FavoriteIcon />}
            {pets && <PetsIcon />}
            {users && <GroupIcon />}

            <Link href={href}>{children}</Link>
        </div>
    )
}
