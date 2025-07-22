import { Input } from "@/components/Core/Input";
import { Button } from "@/components/Core/Button";

export const MyPetsForm = ({ formData, onChange, onSubmit, isEditing }) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <Input name="name" value={formData.name} onChange={onChange} placeholder="Nombre*" required white/>
            <Input name="age" value={formData.age} onChange={onChange} placeholder="Edad*" required white/>
            <Input name="breed" value={formData.breed} onChange={onChange} placeholder="Raza (opcional)" white/>
            <Input name="temperament" value={formData.temperament} onChange={onChange} placeholder="Temperamento*" required white/>
            <Input name="weight" value={formData.weight} onChange={onChange} placeholder="Peso (opcional)" white/>
            <Input name="lifeExpectancy" value={formData.lifeExpectancy} onChange={onChange} placeholder="Esperanza de vida (opcional)" white/>

            <select
                name="type"
                value={formData.type}
                onChange={onChange}
                required
                className="border rounded p-2 text-white"
            >
                <option className="text-black " value="">Selecciona el tipo</option>
                <option className="text-black" value="perro">Perro</option>
                <option className="text-black" value="gato">Gato</option>
            </select>

            <Button className='bg-white/20 hover:bg-white/50' type="submit" fit>{isEditing ? "Actualizar" : "Registrar"} mascota</Button>
        </form>
    );
};
