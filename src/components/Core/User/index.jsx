import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser } from '@/lib/auth';

export const User = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.replace('/login');
        } else {
            setUser(getUser());
        }
    }, []);

    if (!user) return null; // espera que cargue el user
    return (
        <div>
            <h1>Bienvenido/a, {user.name}</h1>
        </div>
    )
}
