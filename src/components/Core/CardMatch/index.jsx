'use client';
import { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button } from "@/components/Core/Button";
import { ChatModal } from '@/app/ChatModal';

export const CardMatch = ({ pet, onDelete, currentUser }) => {
    const [showChat, setShowChat] = useState(false);

    const handleOpenChat = () => {
        setShowChat(true);
    };

    const handleCloseChat = () => {
        setShowChat(false);
    };

    return (
        <div className="relative h-[410px] max-xl:h-[350px] max-sm:h-[410px] rounded-lg overflow-hidden shadow-2xl text-white font-sans group">
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
                <div className="mt-5 flex justify-center gap-5">
                    <Button fit onClick={handleOpenChat} className='bg-red-500/60 hover:bg-red-500/80'>
                        <FavoriteBorderIcon />
                    </Button>
                    <Button
                        fit
                        onClick={onDelete}
                        aria-label="Eliminar"
                        className="bg-white/50 hover:bg-white/70 text-white px-4 flex"
                    >
                        x
                    </Button>
                </div>
            </div>

            {showChat && (
                <ChatModal
                    onClose={handleCloseChat}
                    pet={pet}
                    currentUser={currentUser}
                />
            )}
        </div>
    );
};
