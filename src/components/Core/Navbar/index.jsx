import { logout, isAuthenticated } from '../lib/auth';
import { useRouter } from 'next/router';

export default function NavBar() {
    const router = useRouter();
    const user = isAuthenticated();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <nav>
            {user ? (
                <>
                    <span>Hola {user.email}</span>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </>
            ) : (
                <a href="/login">Login</a>
            )}
        </nav>
    );
}
