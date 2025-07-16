'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser, logout } from '@/lib/auth';
import { Button } from '@/components/Core/Button';

export const DashboardView = () => {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.replace('/login');
        }
    }, []);

    const user = getUser();

    const handleLogout = () => {
        logout(); // 🔐 Limpia localStorage
        router.push('/login'); // ➡️ Redirige al login
    };

    if (!user) return null;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Bienvenido, {user.name}</h1>
            <p>Estás en el dashboard 🔐</p>
            <Button onClick={handleLogout} className='mt-1rem' children='Cerrar sesión'/>
        </div>
    );
}

