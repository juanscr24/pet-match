import { CardMatch } from "../CardMatch";

export const MatchList = ({ pets }) => {
    if (pets.length === 0) {
        return (
            <p className="text-center text-gray-500">
                Aún no has dado like a ninguna mascota 😿
            </p>
        );
    }

    return (
        <div className="flex flex-wrap gap-6">
            {pets.map((pet) => (
                <CardMatch key={pet.id} pet={pet} />
            ))}
        </div>
    );
};
