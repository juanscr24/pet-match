'use client';
import { CardMatch } from "../CardMatch";

export function MatchList({ pets = [], onDelete }) {
    return (
        <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-5">
            {pets.map((pet) => (
                <CardMatch
                    key={pet.matchId}
                    pet={pet}
                    onDelete={() => onDelete(pet.matchId)}
                />
            ))}
        </div>
    );
}
