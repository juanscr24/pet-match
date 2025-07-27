'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../Button';
import { endPointApiDog, endPointApiCat, endPointMatches, KeyApiDog, KeyApiCat, endPointPets } from '@/lib/api';

export default function DogCard() {
    const [customPets, setCustomPets] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [apiPet, setApiPet] = useState(null);
    const [isCatTurn, setIsCatTurn] = useState(false);
    const [loading, setLoading] = useState(true);

    const currentUser = typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : null;

    const currentUserId = currentUser?.id;

    const fetchCustomPets = async () => {
        try {
            const response = await axios.get(endPointPets);
            // Filtrar mascotas que no sean del usuario actual
            const petsFromOthers = response.data.filter(pet => pet.userId !== currentUserId);
            setCustomPets(petsFromOthers);
        } catch (error) {
            console.error('Error cargando mascotas creadas:', error);
        }
    };

    const fetchApiDog = async () => {
        try {
            const res = await axios.get(endPointApiDog, {
                headers: { 'x-api-key': KeyApiDog }
            });
            return res.data[0];
        } catch (err) {
            console.error("Error con Dog API:", err);
            return null;
        }
    };

    const fetchApiCat = async () => {
        try {
            const res = await axios.get(endPointApiCat, {
                headers: { 'x-api-key': KeyApiCat }
            });
            return res.data[0];
        } catch (err) {
            console.error("Error con Cat API:", err);
            return null;
        }
    };

    const fetchNextPet = async () => {
        setLoading(true);
        try {
            if (currentIndex < customPets.length) {
                setApiPet(customPets[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            } else {
                const petData = isCatTurn ? await fetchApiCat() : await fetchApiDog();
                setApiPet(petData);
                setIsCatTurn(prev => !prev);
            }
        } catch (error) {
            console.error("Error obteniendo mascota:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUserId) {
            fetchCustomPets();
        }
    }, [currentUserId]);

    useEffect(() => {
        if (customPets.length >= 0) {
            fetchNextPet();
        }
    }, [customPets]);

    const handleLike = async () => {
        if (!apiPet?.id) return;

        try {
            await axios.post(endPointMatches, {
                id: crypto.randomUUID(),
                userId: currentUserId,
                petId: apiPet.id,
                liked: true,
                petInfo: {
                    url: apiPet.url || apiPet.image || 'img/fallback.jpg',
                    name: apiPet.name || apiPet.breeds?.[0]?.name || 'Desconocido',
                    temperament: apiPet.temperament || apiPet.breeds?.[0]?.temperament || 'N/A'
                }
            });
            console.log("Like guardado!");
        } catch (err) {
            console.error("Error guardando like:", err);
        }

        fetchNextPet();
    };

    const handleDislike = () => {
        fetchNextPet();
    };

    if (loading || !apiPet) {
        return <p className="text-center text-gray-200">Cargando peludito...</p>;
    }

    const breed = apiPet.breeds?.[0];

    return (
        <div className="relative max-w-lg h-[65%] w-full rounded-2xl overflow-hidden shadow-2xl text-white font-sans group">
            <img
                src={apiPet.image || apiPet.url || 'img/fallback.jpg'}
                alt={apiPet.name || breed?.name || 'Desconocido'}
                className="w-full h-[100%] object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 pt-40 pb-6 flex flex-col justify-end">
                <h2 className="text-3xl font-bold">{apiPet.name || breed?.name || 'Desconocido'}</h2>
                <div className="mt-2 text-sm space-y-1">
                    <p>
                        <span className="font-semibold text-gray-300">Temperamento:</span>{' '}
                        {apiPet.temperament || breed?.temperament || 'No disponible'}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-300">Peso:</span>{' '}
                        {breed?.weight?.metric || 'No disponible'} kg
                    </p>
                    <p>
                        <span className="font-semibold text-gray-300">País:</span>{' '}
                        {breed?.country_code || 'No disponible'}
                    </p>
                </div>
                <div className="flex justify-around gap-6 mt-5">
                    <Button onClick={handleDislike} className="bg-red-500/50 hover:bg-red-500/70 p-3 flex justify-center rounded-full">
                        <img width={45} src="img/sad.webp" alt="Dislike" />
                    </Button>
                    <Button onClick={handleLike} className="bg-green-500/50 hover:bg-green-500/70 p-3 flex justify-center rounded-full">
                        <img width={45} src="img/smile.webp" alt="Like" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
