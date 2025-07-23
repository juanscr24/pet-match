'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { getUser, isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { MatchList } from "@/components/Core/MatchList.jsx";
import { endPointMatches } from "@/lib/api";
import Swal from 'sweetalert2';

export const MatchView = () => {
    const [likedPets, setLikedPets] = useState([]);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.replace('/login');
        } else {
            const userData = getUser();
            setUser(userData);
        }
    }, []);

    const fetchLikedPets = async () => {
        if (!user?.id) return;

        try {
            const { data: matches } = await axios.get(endPointMatches);

            const myLikes = matches.filter(
                (match) => match.userId === user.id && match.liked && match.petInfo
            );

            const petsData = myLikes.map((match) => ({
                matchId: match.id,
                id: match.petId,
                url: match.petInfo?.url,
                name: match.petInfo?.name || 'Desconocido',
                temperament: match.petInfo?.temperament || 'No disponible',
            }));

            setLikedPets(petsData);
        } catch (err) {
            console.error("Error cargando pets de Match:", err);
        }
    };

    const handleDeleteMatch = async (matchId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¡Este match será eliminado!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${endPointMatches}/${matchId}`);
                setLikedPets(prev => prev.filter(pet => pet.matchId !== matchId));

                Swal.fire(
                    'Eliminado',
                    'El match ha sido eliminado con éxito.',
                    'success'
                );
            } catch (error) {
                console.error("Error eliminando el match:", error);
                Swal.fire(
                    'Error',
                    'Ocurrió un problema al eliminar el match.',
                    'error'
                );
            }
        }
    };

    useEffect(() => {
        fetchLikedPets();
    }, [user]);

    if (!user) return null;

    return (
        <div className='p-5 max-sm:px-8'>
            <h2 className="text-xl font-bold mb-4 text-gray-200">Mascotas que te gustaron</h2>
            <MatchList pets={likedPets} onDelete={handleDeleteMatch} />
        </div>
    );
};
