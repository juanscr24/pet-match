"use client";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { MyPetsForm } from "@/components/Core/MyPetsForm";
import { MyPetsCardList } from "@/components/Core/MyPetsCard";
import { Button } from '@/components/Core/Button';

const API_URL = "http://localhost:3001/pets";

export const MyPetsView = () => {
  const [myPets, setMyPets] = useState([]);
  const [formData, setFormData] = useState({
    name: "", age: "", breed: "", temperament: "", weight: "", lifeExpectancy: "", type: ""
  });
  const [editingPetId, setEditingPetId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const currentUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;

  const fetchPets = async () => {
    const response = await axios.get(API_URL);
    const filtered = response.data.filter(pet => pet.userId === currentUser?.id);
    setMyPets(filtered);
  };

  useEffect(() => { fetchPets(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, age, temperament, type } = formData;
    if (!name || !age || !temperament || !type) {
      return alert("Nombre, edad, temperamento y tipo son obligatorios");
    }

    if (editingPetId) {
      await axios.put(`${API_URL}/${editingPetId}`, { ...formData, userId: currentUser.id });
      setEditingPetId(null);
    } else {
      const newPet = { id: uuid(), ...formData, userId: currentUser.id };
      await axios.post(API_URL, newPet);
    }

    setFormData({ name: "", age: "", breed: "", temperament: "", weight: "", lifeExpectancy: "", type: "" });
    setShowForm(false); // Oculta el formulario después de enviar
    fetchPets();
  };

  const handleEdit = (pet) => {
    setFormData({ ...pet, type: pet.type || "" });
    setEditingPetId(pet.id);
    setShowForm(true); // Muestra el formulario al editar
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchPets();
  };

  const toggleForm = () => setShowForm(prev => !prev);

  return (
    <div className='p-5'>
      <h2 className="text-2xl font-bold text-white">Mis Mascotas</h2>
      <div className="flex gap-6 pt-5 items-center">
        <MyPetsCardList pets={myPets} onEdit={handleEdit} onDelete={handleDelete} />

        <Button fit onClick={toggleForm}>
          <AddCircleOutlineIcon className='text-white' fontSize='large'/>
        </Button>

        {showForm && (
          <MyPetsForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isEditing={!!editingPetId}
          />
        )}
      </div>
    </div>
  );
};

