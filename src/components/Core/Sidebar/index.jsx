'use client';

import Link from 'next/link';
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
        <aside className="shadow-xl px-6 w-80 h-[97%] rounded-2xl ml-5 bg-amber-200">
            <div className="flex flex-col h-[97%] w-68 justify-between absolute ">
                <div className='py-10 flex gap-4'>
                    <h1 className="text-xl font-bold">PetMatch</h1>
                    <PetsIcon />
                </div>
                <hr />
                <div className='flex flex-col gap-10 py-4'>
                    <h2 className='font-bold'>Menu</h2>
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
                <div className='flex justify-between py-10'>
                    <User />
                    <Button onClick={logout} fit className='bg-white hover:bg-gray-200'>
                        <LogoutIcon sx={{color:'black'}}/>
                    </Button>
                </div>
            </div>
        </aside>
    );
};
