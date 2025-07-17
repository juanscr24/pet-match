'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, isAuthenticated } from '@/lib/auth';
import { Button } from '@/components/Core/Button';
import { Input } from '@/components/Core/Input';
import Link from 'next/link';

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
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg')" }}>
            <form
                onSubmit={handleSubmit}
                className="backdrop-blur-md py-10 px-14 bg-white/30 shadow-lg rounded-xl flex flex-col items-center gap-4"
            >
                <h2 className="text-2xl font-semibold text-white">Iniciar sesión</h2>

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

                <Button type="submit" children={'Enviar'} />

                <span className='text-[#3d3d3d]'>No tienes cuenta? <Link className='font-bold' href='/register'>Registrate</Link></span>

                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
        </div>

    );
}
