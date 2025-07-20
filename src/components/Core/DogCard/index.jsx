'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../Button';

export default function DogCard() {
    const [dog, setDog] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDog = async () => {
        setLoading(true);
        try {
            let dogData = null;
            let attempts = 0;

            // 🔁 Repetir hasta que tenga raza
            while (!dogData?.breeds?.[0] && attempts < 10) {
                const response = await axios.get(
                    'https://api.thedogapi.com/v1/images/search?include_breeds=1',
                    {
                        headers: {
                            'x-api-key': 'live_pdv9eSLIZwqtTS7bUMYS5llFqxpttrldmTH0kLvA6dc2uJO98w9JfDKu6sPavfno',
                        },
                    }
                );
                dogData = response.data[0];
                attempts++;
            }

            setDog(dogData);
        } catch (error) {
            console.error('Error fetching dog:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDog();
    }, []);

    if (loading || !dog) {
        return <p className="text-center text-gray-600">Cargando peludito...</p>;
    }

    const breed = dog.breeds?.[0];

    return (
        <div className="relative max-w-lg h-[65%] w-full rounded-2xl overflow-hidden shadow-2xl text-white font-sans group">
            {/* Imagen de fondo */}
            <img
                src={dog.url}
                alt={breed?.name || 'Perro'}
                className="w-full h-[100%] object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />

            {/* Capa oscura para superponer contenido */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 pt-40 pb-6 flex flex-col justify-end">
                <h2 className="text-3xl font-bold">{breed?.name}</h2>

                <div className="mt-2 text-sm space-y-1">
                    <p>
                        <span className="font-semibold text-gray-300">Temperamento:</span>{' '}
                        {breed.temperament || 'No disponible'}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-300">Peso:</span>{' '}
                        {breed.weight?.metric || 'No disponible'} kg
                    </p>
                    <p>
                        <span className="font-semibold text-gray-300">País:</span>{' '}
                        {breed.country_code || 'No disponible'}
                    </p>
                </div>

                <div className="flex justify-around gap-6 mt-5">
                    <Button
                        onClick={fetchDog}
                        className="bg-red-500/50 hover:bg-red-500/70  flex justify-center text-white p-3 rounded-full text-xl shadow-md"
                    >
                        <img width={45} src="img/sad.webp" alt="Sad Dog" />
                    </Button>
                    <Button
                        onClick={fetchDog}
                        className="bg-green-500/50 hover:bg-green-500/70 flex justify-center text-white p-3 rounded-full text-xl shadow-md"
                    >
                    <img width={45} src="img/smile.webp" alt="Smile Dog" />
                    </Button>
                </div>
            </div>
        </div>

    );
}
