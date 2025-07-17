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
        <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-lg text-center space-y-4">
            <img
                src={dog.url}
                alt={breed?.name || 'Perro'}
                className="w-full h-64 object-cover rounded-xl"
            />

            <h2 className="text-xl font-bold">{breed?.name}</h2>

            <div className="text-left px-4 space-y-1">
                <p>
                    <strong>Temperamento:</strong>{' '}
                    {breed.temperament || 'No disponible'}
                </p>
                <p>
                    <strong>Peso:</strong> {breed.weight?.metric || 'No disponible'} kg
                </p>
                <p>
                    <strong>Esperanza de vida:</strong>{' '}
                    {breed.life_span || 'No disponible'}
                </p>
            </div>

            <div className="flex justify-center gap-10 mt-4">
                <Button
                    onClick={fetchDog}
                    className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-xl text-2xl"
                >
                    ❌
                </Button>
                <Button
                    onClick={fetchDog}
                    className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl text-2xl"
                >
                    💚
                </Button>
            </div>
        </div>
    );
}
