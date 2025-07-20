'use client';

import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser } from '@/lib/auth';
import axios from 'axios';

export const ProfileView = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [desc, setDesc] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (!isAuthenticated()) {
                router.replace('/login');
                return;
            }

            const storedUser = getUser();
            try {
                const { data } = await axios.get(`http://localhost:3001/users/${storedUser.id}`);
                setUser(data);
                setDesc(data.desc || '');
            } catch (error) {
                console.error('Error cargando usuario:', error);
            }
        };

        fetchUser();
    }, []);

    const handleSave = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const { data } = await axios.patch(`http://localhost:3001/users/${user.id}`, {
                desc,
            });
            setUser(data);
            setEditMode(false);
        } catch (error) {
            console.error('Error guardando descripción:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!user) return;
        setLoading(true);
        try {
            await axios.patch(`http://localhost:3001/users/${user.id}`, {
                desc: '',
            });
            setDesc('');
            setEditMode(false);
        } catch (error) {
            console.error('Error eliminando descripción:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <section className="p-10 max-w-4xl text-white">
            <h1 className="text-xl font-bold mb-6">Profile</h1>

            <div className="bg-black/40 p-6 rounded-2xl shadow-md backdrop-blur-md flex flex-col md:flex-row gap-10 items-center">
                <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <span className="text-7xl text-gray-700">{user.name.charAt(0).toUpperCase()}</span>
                </div>

                <div className="flex-1">
                    <p><strong>Nombre:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Ciudad:</strong> {user.city}</p>

                    <div className="mt-5">
                        <p className="mb-2 font-semibold">Descripción:</p>

                        {!editMode ? (
                            <>
                                {desc ? (
                                    <p className="mb-4">{desc}</p>
                                ) : (
                                    <p className="mb-4 text-gray-400 italic">No tienes una descripción aún.</p>
                                )}
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="bg-blue-500 px-4 py-2 rounded-md mr-2 cursor-pointer"
                                >
                                    {desc ? <ModeEditIcon/> : <AddIcon /> }
                                </button>
                                {desc && (
                                    <button
                                        onClick={handleDelete}
                                        className="bg-red-500 px-4 py-2 rounded-md cursor-pointer"
                                    >
                                        <DeleteOutlineIcon />
                                    </button>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <textarea
                                    className="p-2 rounded-md text-black resize-none h-24"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                                <div>
                                    <button
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="bg-green-500 px-4 py-2 rounded-md mr-2"
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditMode(false);
                                            setDesc(user.desc || '');
                                        }}
                                        className="bg-gray-500 px-4 py-2 rounded-md"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
