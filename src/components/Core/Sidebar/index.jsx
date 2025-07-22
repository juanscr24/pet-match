'use client';

import { logout } from '@/lib/auth';
import { Button } from '../Button';
import { useUser } from '@/hooks/useUser';
import { User } from '../User';
import LogoutIcon from '@mui/icons-material/Logout';
import { LinkComponent } from '../LinkComponent';
import { ROUTEADMIN, ROUTESUSER } from '@/constants/ROUTES';
import { ProfilePet } from '../ProfilePet';
import InfoIcon from '@mui/icons-material/Info';

export const Sidebar = () => {
    const { user } = useUser();

    return (
        <aside className="flex flex-col h-[97%] w-80 justify-between rounded-2xl fixed ml-5 shadow-xl mt-3 bg-[rgba(255,255,255,0.07)]">
            <div className='py-10 flex gap-4 px-5 justify-center'>
                <ProfilePet />
            </div>
            <hr className="border-0 h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <div className='flex flex-col gap-6'>
                <h2 className='font-bold px-5 text-white text-lg'>Menu</h2>
                {ROUTESUSER.map((route, index) => (
                    <LinkComponent key={index} href={route.path} profile icon={route.icon}>
                        {route.label}
                    </LinkComponent>
                ))}
                {user?.role === 'admin' && (
                    <>
                        {ROUTEADMIN.map((route, index) => (
                            <LinkComponent key={index} href={route.path} profile icon={route.icon}>
                                {route.label}
                            </LinkComponent>
                        ))}
                    </>
                )}
                <LinkComponent children='Conócenos' href='/aboutUs' icon={<InfoIcon />}/>
            </div>
            <hr className="border-0 h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <div className='flex justify-between py-7 px-5'>
                <User />
                <Button onClick={logout} fit className='bg-transparent hover:bg-[rgba(255,255,255,0.3)] '>
                    <LogoutIcon className='text-gray-200' />
                </Button>
            </div>
        </aside>
    )
}
