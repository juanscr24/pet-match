'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, isAuthenticated } from '@/lib/auth';
import { Button } from '@/components/Core/Button';
import { Input } from '@/components/Core/Input';

export default function LoginView() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isAuthenticated()) {
            router.replace('/');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login({ email, password: pw });
            router.replace('/');
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 300 }}>
            <h2>Iniciar sesión</h2>
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo"
                required
            />
            <Input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Contraseña"
                required
            />
            <Button type='submit' children={'Enviar'}/> 
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}
