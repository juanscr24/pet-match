'use client';

import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser } from '@/lib/auth';
import axios from 'axios';
import { endPointUsers } from '@/lib/api';
import { Button } from '@/components/Core/Button';

export const ProfileView = () => {
    const router = useRouter();
    // Estado del usuario actual
    const [user, setUser] = useState(null);
    // Estado de la descripción del perfil
    const [desc, setDesc] = useState('');
    // Estado para activar o desactivar el modo de edición
    const [editMode, setEditMode] = useState(false);
    // Estado para saber si está cargando algo
    const [loading, setLoading] = useState(false);

    // useEffect que se ejecuta al montar el componente
    useEffect(() => {
        // Si no hay usuario logueado, redirige al login
        const fetchUser = async () => {
            if (!isAuthenticated()) {
                router.replace('/login');
                return;
            }

             // Obtiene el usuario desde el localStorage
            const storedUser = getUser();
            try {
                const { data } = await axios.get(`${endPointUsers}/${storedUser.id}`);
                setUser(data);
                setDesc(data.desc || '');
            } catch (error) {
                console.error('Error cargando usuario:', error);
            }
        };

        // Llama a la función al cargar
        fetchUser();
    }, []);

    // Función para guardar cambios de nombre o descripción
    const handleSave = async () => {
        if (!user || user.name.trim() === '') return;
        setLoading(true);
        try {
            // Actualiza el usuario en la base de datos
            const { data } = await axios.patch(`${endPointUsers}/${user.id}`, {
                name: user.name,
                desc,
            });

            // Guarda en localStorage para que los demás componentes lo vean actualizado
            localStorage.setItem('user', JSON.stringify(data));

            setUser(data);
            setEditMode(false);
        } catch (error) {
            console.error('Error guardando datos:', error);
        } finally {
            setLoading(false);
        }
    };

    // Función para eliminar solo la descripción del usuario
    const handleDelete = async () => {
        if (!user) return;
        setLoading(true);
        try {
            // Quita la descripción en la base de datos
            await axios.patch(`${endPointUsers}/${user.id}`, {
                desc: '',
            });
             // Limpia la descripción localmente
            setDesc('');
            setEditMode(false);
        } catch (error) {
            console.error('Error eliminando descripción:', error);
        } finally {
            setLoading(false);
        }
    };
    // Si no hay usuario cargado, no se muestra nada
    if (!user) return null;

    // Renderiza la View
    return (
        <section className="p-5 max-w-2xl text-white">
            <h1 className="text-xl font-bold mb-6">Perfil</h1>

            <div className="bg-black/40 p-6 rounded-2xl shadow-md backdrop-blur-md flex flex-col md:flex-row gap-10 items-center">
                <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <span className="text-7xl text-gray-700">{user.name.charAt(0).toUpperCase()}</span>
                </div>

                <div className="flex-1">
                    <p className="mb-2 font-semibold">Nombre:</p>
                    {!editMode ? (
                        <p className="mb-4">{user.name}</p>
                    ) : (
                        <input
                            type="text"
                            value={user.name}
                            onChange={(e) =>
                                setUser((prev) => ({ ...prev, name: e.target.value }))
                            }
                            className="p-2 rounded-md text-white w-full max-w-sm mb-4 border-2"
                        />
                    )}

                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Ciudad:</strong> {user.city}</p>

                    <div className="mt-5">
                        <p className="mb-2 font-semibold">Descripción:</p>

                        {!editMode ? (
                            <>
                                {desc ? (
                                    <p className="mb-4">{desc}</p>
                                ) : (
                                    <p className="mb-4 text-gray-200 italic">No tienes una descripción aún.</p>
                                )}
                                <Button
                                    fit
                                    onClick={() => setEditMode(true)}
                                    className="bg-blue-500/50 hover:bg-blue-500/80 px-4 py-2 rounded-md mr-2 cursor-pointer"
                                >
                                    {desc ? <ModeEditIcon /> : <AddIcon />}
                                </Button>
                                {desc && (
                                    <Button
                                        fit
                                        onClick={handleDelete}
                                        className="bg-red-500/50 hover:bg-red-500/80 px-4 py-2 rounded-md cursor-pointer"
                                    >
                                        <DeleteOutlineIcon />
                                    </Button>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <textarea
                                    className="p-2 rounded-md text-white resize-none h-24 border-2"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                                <div className='flex gap-2'>
                                    <Button
                                        fit
                                        onClick={handleSave}
                                        disabled={loading || user.name.trim() === ''}
                                        className="bg-green-500/50 hover:bg-green-500/80 px-4 py-2"
                                    >
                                        Guardar
                                    </Button>
                                    <Button
                                        fit
                                        onClick={() => {
                                            setEditMode(false);
                                            setDesc(user.desc || '');
                                        }}
                                        className="bg-gray-500/50 hover:bg-gray-500/80 px-4 py-2"
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
