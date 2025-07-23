'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { getUser, isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { MatchList } from "@/components/Core/MatchList.jsx";
import { endPointMatches } from "@/lib/api";

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
        try {
            await axios.delete(`${endPointMatches}/${matchId}`);
            setLikedPets(prev => prev.filter(pet => pet.matchId !== matchId));
        } catch (error) {
            console.error("Error eliminando el match:", error);
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
