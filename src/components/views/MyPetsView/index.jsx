"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { MyPetsCardList } from "@/components/Core/MyPetsCard";
import { endPointPets, endPointApiDog, KeyApiDog, endPointApiCat, KeyApiCat } from "@/lib/api";
import Swal from 'sweetalert2';

export const MyPetsView = () => {
  const [myPets, setMyPets] = useState([]);
  const [formData, setFormData] = useState({
    name: "", age: "", breed: "", temperament: "", weight: "", lifeExpectancy: "", type: "", image: ""
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

    let imageURL = formData.image || "";

    // ✅ Traer imagen aleatoria si es perro o gato
    try {
      if (!imageURL && type.toLowerCase() === "perro") {
        const res = await axios.get(endPointApiDog, {
          headers: { "x-api-key": KeyApiDog }
        });
        imageURL = res.data[0]?.url;
      } else if (!imageURL && type.toLowerCase() === "gato") {
        const res = await axios.get(endPointApiCat, {
          headers: { "x-api-key": KeyApiCat }
        });
        imageURL = res.data[0]?.url;
      }
    } catch (err) {
      console.error("Error al traer imagen aleatoria:", err);
    }

    const petPayload = {
      ...formData,
      image: imageURL,
      userId: currentUser.id
    };

    if (editingPetId) {
      await axios.put(`${endPointPets}/${editingPetId}`, petPayload);
      setEditingPetId(null);
    } else {
      const newPet = { id: uuid(), ...petPayload };
      await axios.post(endPointPets, newPet);
    }

    setFormData({ name: "", age: "", breed: "", temperament: "", weight: "", lifeExpectancy: "", type: "", image: "" });
    setShowForm(false);
    fetchPets();
  };

  const handleEdit = (pet) => {
    setFormData({ ...pet, type: pet.type || "" });
    setEditingPetId(pet.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta mascota será eliminada!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (result.isConfirmed) {
      await axios.delete(`${endPointPets}/${id}`);
      fetchPets();
      Swal.fire('Eliminado', 'La mascota ha sido eliminada.', 'success');
    }
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
