import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser } from '@/lib/auth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
        <div className='flex items-center gap-2'>
            <AccountCircleIcon sx={{fontSize:40, color:'black'}}/>
            <h1>{user.name}</h1>
        </div>
    )
}
