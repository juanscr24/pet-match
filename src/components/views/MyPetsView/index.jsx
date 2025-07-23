"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { MyPetsCardList } from "@/components/Core/MyPetsCard";
import { endPointPets } from "@/lib/api";

export const MyPetsView = () => {
  const [myPets, setMyPets] = useState([]);
  const [formData, setFormData] = useState({
    name: "", age: "", breed: "", temperament: "", weight: "", lifeExpectancy: "", type: ""
  });
  const [editingPetId, setEditingPetId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const currentUser = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const fetchPets = async () => {
    const response = await axios.get(endPointPets);
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
      await axios.put(`${endPointPets}/${editingPetId}`, { ...formData, userId: currentUser.id });
      setEditingPetId(null);
    } else {
      const newPet = { id: uuid(), ...formData, userId: currentUser.id };
      await axios.post(endPointPets, newPet);
    }

    setFormData({ name: "", age: "", breed: "", temperament: "", weight: "", lifeExpectancy: "", type: "" });
    setShowForm(false);
    fetchPets();
  };

  const handleEdit = (pet) => {
    setFormData({ ...pet, type: pet.type || "" });
    setEditingPetId(pet.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${endPointPets}/${id}`);
    fetchPets();
  };

  const toggleForm = () => setShowForm(prev => !prev);

  return (
    <div className='p-5 max-sm:p-8'>
      <h2 className="text-xl font-bold mb-4 text-gray-200">Mis Mascotas</h2>
        <MyPetsCardList
          pets={myPets}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showForm={showForm}
          toggleForm={toggleForm}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEditing={!!editingPetId}
        />
    </div>
  );
};
