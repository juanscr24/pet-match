'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { endPointMatches, endPointPets, endPointUsers } from '@/lib/api';

import GroupIcon from '@mui/icons-material/Group';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { StatsCard } from '@/components/Core/StatsCard';


export const StatisticsView = () => {
    const [users, setUsers] = useState([]);
    const [pets, setPets] = useState([]);
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const [usersRes, petsRes, matchesRes] = await Promise.all([
                axios.get(endPointUsers),
                axios.get(endPointPets),
                axios.get(endPointMatches),
            ]);
            setUsers(usersRes.data);
            setPets(petsRes.data);
            setMatches(matchesRes.data);
        };
        fetchData();
    }, []);

    // Cálculos rápidos
    const mascotasPorTipo = pets.reduce((acc, pet) => {
        acc[pet.type] = (acc[pet.type] || 0) + 1;
        return acc;
    }, {});

    const usuariosPorCiudad = users.reduce((acc, user) => {
        const ciudad = user.city?.toLowerCase();
        acc[ciudad] = (acc[ciudad] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-xl font-bold mb-6 text-center text-gray-200">Estadísticas de PetMatch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-sm:grid-cols-2">

                <StatsCard title="Usuarios registrados" value={users.length} Icon={GroupIcon} />
                <StatsCard title="Mascotas registradas" value={pets.length} Icon={PetsIcon} />
                <StatsCard title="Total de matches" value={matches.length} Icon={FavoriteIcon} />


                {Object.entries(mascotasPorTipo).map(([tipo, cantidad]) => (
                    <StatsCard key={tipo} title={`Mascotas tipo ${tipo}`} value={cantidad} Icon={PetsIcon} />
                ))}

                {Object.entries(usuariosPorCiudad).map(([ciudad, cantidad]) => (
                    <StatsCard key={ciudad} title={`Usuarios en ${ciudad}`} value={cantidad} Icon={LocationCityIcon} />
                ))}

            </div>
        </div>
    );
};


