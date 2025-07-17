'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { isAuthenticated, login } from '@/lib/auth';
import { Button } from '@/components/Core/Button';
import { Input } from '@/components/Core/Input';
import Link from 'next/link';

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
                city,
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
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg')" }}>
        <form onSubmit={handleSubmit} className="backdrop-blur-md py-10 px-14 bg-white/30 shadow-lg rounded-xl flex flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold text-white">Registrarse</h2>
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
            <span className='text-[#3d3d3d]'>Ya tienes cuenta? <Link className='font-bold' href='/login'>Iniciar</Link></span>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        </div>
    );
}
