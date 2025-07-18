import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser } from '@/lib/auth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

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
        <Link href="/profile">
            <div className='flex items-center gap-2'>
                <AccountCircleIcon sx={{ fontSize: 40, }} className='text-gray-200' />
                <h1 className='text-gray-200'>{user.name}</h1>
            </div>
        </Link>
    )
}
