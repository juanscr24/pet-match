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
    const [role, setRole] = useState('user'); // Rol seleccionable
    const [error, setError] = useState('');

    useEffect(() => {
        if (isAuthenticated()) {
            router.replace('/dashboard');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Verificar si ya existe un usuario con ese correo
            const existsRes = await api.get(`/users`, { params: { email } });
            if (existsRes.data.length > 0) {
                setError('Ese correo ya está registrado.');
                return;
            }

            // Crear nuevo usuario
            await api.post('/users', {
                name,
                email,
                password: pw,
                city,
                role, // "user" o "admin"
            });

            // Login automático
            const newUser = await login({ email, password: pw });

            // Redireccionar según rol
            router.replace(newUser.role === 'admin' ? '/admin' : '/dashboard');
        } catch (err) {
            console.error(err);
            setError('Error al registrar usuario');
        }
    };

    return (
        <div
            className="relative flex justify-center items-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg')",
            }}
        >
            {/* Capa oscura con desenfoque */}
            <div className="absolute inset-0 bg-black/50 "></div>
            <form
                onSubmit={handleSubmit}
                className="backdrop-blur-sm py-10 px-14 bg-white/20 shadow-lg rounded-xl flex flex-col items-center gap-4"
            >
                <h2 className="text-2xl font-semibold text-white">Registrarse</h2>

                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                    required
                    white
                />
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo"
                    required
                    white
                />
                <Input
                    type="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="Contraseña"
                    required
                    white
                />
                <Input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ciudad"
                    required
                    white
                />

                <Button className='bg-black/50 hover:bg-black/70' type="submit" children={'Crear Cuenta'} />
                <span className="text-gray-200">
                    Ya tienes cuenta?{' '}
                    <Link className="font-bold" href="/login">
                        Iniciar
                    </Link>
                </span>
                {error && <p className="text-red-600">{error}</p>}
            </form>
        </div>
    );
}
