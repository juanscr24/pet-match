// src/components/views/MyPetsView/index.jsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

const API_URL = "http://localhost:3001/pets";

export const MyPetsView = () => {
  const [myPets, setMyPets] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    breed: "",
    temperament: "",
    weight: "",
    lifeExpectancy: ""
  });
  const [editingPetId, setEditingPetId] = useState(null);

  const currentUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;

  const fetchPets = async () => {
    const response = await axios.get(API_URL);
    const filtered = response.data.filter(pet => pet.userId === currentUser?.id);
    setMyPets(filtered);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, age, temperament } = formData;
    if (!name || !age || !temperament) return alert("Nombre, edad y temperamento son obligatorios");

    if (editingPetId) {
      await axios.put(`${API_URL}/${editingPetId}`, { ...formData, userId: currentUser.id });
      setEditingPetId(null);
    } else {
      const newPet = {
        id: uuid(),
        ...formData,
        userId: currentUser.id
      };
      await axios.post(API_URL, newPet);
    }
    setFormData({ name: "", age: "", breed: "", temperament: "", weight: "", lifeExpectancy: "" });
    fetchPets();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchPets();
  };

  const handleEdit = (pet) => {
    setFormData({
      name: pet.name,
      age: pet.age,
      breed: pet.breed,
      temperament: pet.temperament,
      weight: pet.weight,
      lifeExpectancy: pet.lifeExpectancy
    });
    setEditingPetId(pet.id);
  };

  return (
    <div className="h-dvh" style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h2>Mis Mascotas</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre*" required />
        <input name="age" value={formData.age} onChange={handleChange} placeholder="Edad*" required />
        <input name="breed" value={formData.breed} onChange={handleChange} placeholder="Raza (opcional)" />
        <input name="temperament" value={formData.temperament} onChange={handleChange} placeholder="Temperamento*" required />
        <input name="weight" value={formData.weight} onChange={handleChange} placeholder="Peso (opcional)" />
        <input name="lifeExpectancy" value={formData.lifeExpectancy} onChange={handleChange} placeholder="Esperanza de vida (opcional)" />
        <button type="submit">{editingPetId ? "Actualizar" : "Registrar"} mascota</button>
      </form>

      <div style={{ marginTop: 30 }}>
        {myPets.length === 0 ? (
          <p>No has registrado mascotas.</p>
        ) : (
          myPets.map(pet => (
            <div key={pet.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
              <h3>{pet.name}</h3>
              <p>Edad: {pet.age}</p>
              <p>Raza: {pet.breed || "No registrada"}</p>
              <p>Temperamento: {pet.temperament}</p>
              <p>Peso: {pet.weight || "No registrado"}</p>
              <p>Esperanza de vida: {pet.lifeExpectancy || "No registrada"}</p>
              <button onClick={() => handleEdit(pet)}>Editar</button>
              <button onClick={() => handleDelete(pet.id)}>Eliminar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
