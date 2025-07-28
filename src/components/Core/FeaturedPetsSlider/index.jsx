"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export const FeaturedPetsSlider = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/pets")
            .then(res => setPets(res.data.slice(0, 5)))
            .catch(err => console.error(err));
    }, []);

    return (
        <section className="my-10">
            <h2 className="text-2xl font-bold text-center text-white mb-6">Mascotas destacadas</h2>
            <div className="grid grid-cols-5 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-5 overflow-x-auto">
                {pets.map(pet => (
                    <div
                        key={pet.id}
                        className="relative h-[410px] rounded-xl overflow-hidden shadow-2xl text-white font-sans group"
                    >
                        <img
                            src={pet.url || pet.image}
                            alt={pet.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pt-36 pb-4 flex flex-col justify-end">
                            <h3 className="text-xl font-bold">{pet.name}</h3>
                            <p className="text-sm text-gray-300">
                                <span className="font-semibold">Raza:</span> {pet.breed}
                            </p>
                            <p className="text-sm text-gray-300">
                                <span className="font-semibold">Edad:</span> {pet.age} años
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
