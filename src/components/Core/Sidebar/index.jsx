'use client';

import { logout } from '@/lib/auth';
import { Button } from '../Button';
import { useUser } from '@/hooks/useUser';
import { User } from '../User';
import LogoutIcon from '@mui/icons-material/Logout';
import PetsIcon from '@mui/icons-material/Pets';
import { LinkComponent } from '../LinkComponent';

export const Sidebar = () => {
    const { user } = useUser();

    return (
        <aside className="flex flex-col h-[97%] w-80 justify-between rounded-2xl absolute ml-5  bg-amber-200 shadow-xl mt-3">
                <div className='py-10 flex gap-4 px-5'>
                    <h1 className="text-xl font-bold">PetMatch</h1>
                    <PetsIcon />
                </div>
                <hr />
                <div className='flex flex-col gap-6'>
                    <h2 className='font-bold px-5'>Menu</h2>
                    <LinkComponent href="/profile" children="Profile" profile/>
                    <LinkComponent href="/dashboard" children="Dashboard" dashboard/>
                    <LinkComponent href="/match" children="Match" match/>
                    <LinkComponent href="/my-pets" children="My pets" pets/>
                    {user?.role === 'admin' && (
                        <>
                            <LinkComponent href="/admin/users" children="Users" users/>
                            <LinkComponent href="/admin/pets" children="Pets" pets/>
                        </>
                    )}
                </div>
                <hr />
                <div className='flex justify-between py-10 px-5'>
                    <User />
                    <Button onClick={logout} fit className='bg-white hover:bg-gray-200'>
                        <LogoutIcon sx={{color:'black'}}/>
                    </Button>
                </div>
        </aside>
    );
};
