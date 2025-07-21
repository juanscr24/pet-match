'use client';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button } from "@/components/Core/Button";

export const CardMatch = ({ pet }) => {
    return (
        <div className="relative w-[280px] h-[390px] rounded-lg overflow-hidden shadow-2xl text-white font-sans group">
            <img
                src={pet.url}
                alt={pet.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 pt-40 pb-6 flex flex-col justify-end">
                <h2 className="text-3xl font-bold text-white">{pet.name}</h2>

                <p className="mt-2 text-sm text-gray-300">
                    <span className="font-semibold">Temperamento:</span>{" "}
                    {pet.temperament}
                </p>

                <div className="mt-5 flex justify-center">
                    <Button fit>
                        <FavoriteBorderIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
};
