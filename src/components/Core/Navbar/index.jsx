'use client';

import Link from 'next/link';
import { logout } from '@/lib/auth';
import { Button } from '../Button';
import { useUser } from '@/hooks/useUser';
import LogoutIcon from '@mui/icons-material/Logout';
import { User } from '../User';

export const Navbar = () => {
    const { user } = useUser();

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-pink-500">🐾 PetMatch</h1>

            <div className="flex gap-10 items-center">
                <Link href="/dashboard">Inicio</Link>
                <Link href="/explorar">Explorar</Link>
                <Link href="/mis-mascotas">Mis mascotas</Link>
                <Link href="/solicitudes">Solicitudes</Link>
                <Link href="/publicar">Publicar</Link>
                {user?.role === 'admin' && (
                    <>
                        <Link href="/admin/usuarios">Usuarios</Link>
                        <Link href="/admin/mascotas">Mascotas</Link>
                    </>
                )}
            </div>
            <div className='flex items-center gap-4'>
                <User />
                <Button onClick={logout} fit>
                    <LogoutIcon />
                </Button>
            </div>
        </nav>
    );
};
