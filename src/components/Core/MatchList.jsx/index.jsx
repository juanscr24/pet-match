'use client';
import { useEffect, useState } from 'react';
import { CardMatch } from "../CardMatch";

export function MatchList({ pets = [], onDelete }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-5">
            {pets.map((pet) => (
                <CardMatch
                    key={pet.matchId}
                    pet={pet}
                    onDelete={() => onDelete(pet.matchId)}
                    currentUser={currentUser} // ✅ Aquí lo pasas
                />
            ))}
        </div>
    );
}
