'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { isAuthenticated, login } from '@/lib/auth';
import { Button } from '@/components/Core/Button';
import { Input } from '@/components/Core/Input';

export default function RegisterView() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [city, setCity] = useState('');
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
            // Verifica si el usuario ya existe
            const existsRes = await api.get(`/users`, {
                params: { email }
            });

            if (existsRes.data.length > 0) {
                setError('Ese correo ya está registrado.');
                return;
            }

            // Crea el usuario
            const res = await api.post('/users', {
                name,
                email,
                password: pw,
                role: 'user' // Puedes cambiar o permitir elegir rol si quieres
            });

            // Hace login automático después del registro
            await login({ email, password: pw });
            router.replace('/');
        } catch (err) {
            setError('Error al registrar usuario');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 300 }}>
            <h2>Registrarse</h2>
            <Input 
                type={'name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
                required
            />

            <Input 
                type={'email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo"
                required
            />
            <Input 
                type={'password'}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Contraseña"
                required
            />
            <Input 
                type={'city'}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ciudad"
                required
            />

            <Button type='submit' children={'Crear Cuenta'} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}
