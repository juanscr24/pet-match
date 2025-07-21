import { Button } from "@/components/Core/Button";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const MyPetsCardList = ({ pets, onEdit, onDelete }) => {
    return (
        <div className="flex flex-wrap gap-6">
            {pets.length === 0 ? (
                <p className="text-gray-500 text-center">No has registrado mascotas.</p>
            ) : (
                pets.map((pet) => (
                    <div
                        key={pet.id}
                        className="relative w-[300px] h-[410px] rounded-lg overflow-hidden shadow-2xl text-white font-sans group"
                    >
                        <img
                            src={
                                pet.image ||
                                (pet.type?.toLowerCase() === "gato"
                                    ? "/img/gato.webp"
                                    : "/img/perro.webp")
                            }
                            alt={pet.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 pt-40 pb-6 flex flex-col justify-end">
                            <h2 className="text-3xl font-bold">{pet.name}</h2>

                            <div className="mt-2 text-sm space-y-1">
                                <p>
                                    <span className="font-semibold text-gray-300">Edad:</span>{" "}
                                    {pet.age || "No registrada"}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-300">Raza:</span>{" "}
                                    {pet.breed || "No registrada"}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-300">
                                        Temperamento:
                                    </span>{" "}
                                    {pet.temperament || "No registrado"}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-300">Peso:</span>{" "}
                                    {pet.weight || "No registrado"}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-300">
                                        Esperanza de vida:
                                    </span>{" "}
                                    {pet.lifeExpectancy || "No registrada"}
                                </p>
                            </div>

                            <div className="flex justify-around gap-6 mt-5">
                                <Button
                                    onClick={() => onEdit(pet)}
                                    className="bg-yellow-500/60 hover:bg-yellow-600/80 rounded-full text-white text-sm font-bold shadow-md"
                                >
                                    <ModeEditIcon />
                                </Button>
                                <Button
                                    onClick={() => onDelete(pet.id)}
                                    className="bg-red-500/60 hover:bg-red-600/80 rounded-full text-white text-sm font-bold shadow-md"
                                >
                                    <DeleteOutlineIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
