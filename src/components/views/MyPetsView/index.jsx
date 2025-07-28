"use client";
// Importaciones necesarias
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { MyPetsCardList } from "@/components/Core/MyPetsCard";
import { endPointPets, endPointApiDog, KeyApiDog, endPointApiCat, KeyApiCat } from "@/lib/api";
import { endPointChats, endPointUsers } from "@/lib/api"; // ✅ Asegúrate de tener esto en api.js
import Swal from 'sweetalert2';

export const MyPetsView = () => {
  // Estados para manejar mascotas, chats, usuarios, formulario, edición, etc.
  const [myPets, setMyPets] = useState([]);
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "", age: "", breed: "", temperament: "", weight: "", lifeExpectancy: "", type: "", image: ""
  });
  // ID de mascota en edición
  const [editingPetId, setEditingPetId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  // Obtener el usuario actual desde localStorage
  const currentUser = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  // Función para obtener todas las mascotas y filtrar las del usuario actual
  const fetchPets = async () => {
    const response = await axios.get(endPointPets);
    const filtered = response.data.filter(pet => pet.userId === currentUser?.id);
    setMyPets(filtered);
  };

  // Función para obtener chats y usuarios, filtrando solo los chats donde el usuario es receptor
  const fetchChats = async () => {
    const [chatsRes, usersRes] = await Promise.all([
      axios.get(endPointChats),
      axios.get(endPointUsers)
    ]);

    const myChats = chatsRes.data.filter(chat => chat.receiverId === currentUser.id);
    setChats(myChats);
    setUsers(usersRes.data);
  };
  // useEffect que se ejecuta al montar el componente para cargar datos iniciales
  useEffect(() => {
    fetchPets();
    fetchChats();
  }, []);
  // Maneja el cambio de los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  // Enviar el formulario: crea o actualiza una mascota
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, age, temperament, type } = formData;
    if (!name || !age || !temperament || !type) {
      return alert("Nombre, edad, temperamento y tipo son obligatorios");
    }
    // Validación básica
    let imageURL = formData.image || "";
    try {
      // Si no se proporcionó una imagen, obtener una aleatoria según el tipo
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
    // Construir payload para enviar
    const petPayload = {
      ...formData,
      image: imageURL,
      userId: currentUser.id
    };
    // Si se está editando una mascota existente
    if (editingPetId) {
      await axios.put(`${endPointPets}/${editingPetId}`, petPayload);
      setEditingPetId(null);
    } else {
      const newPet = { id: uuid(), ...petPayload };
      await axios.post(endPointPets, newPet);
    }
    // Limpiar formulario y recargar mascotas
    setFormData({ name: "", age: "", breed: "", temperament: "", weight: "", lifeExpectancy: "", type: "", image: "" });
    setShowForm(false);
    fetchPets();
  };
  // Activar modo de edición y llenar formulario con datos existentes
  const handleEdit = (pet) => {
    setFormData({ ...pet, type: pet.type || "" });
    setEditingPetId(pet.id);
    setShowForm(true);
  };
  // Eliminar mascota con confirmación mediante SweetAlert
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

  const getUserName = (id) => users.find(u => u.id === id)?.name || "Desconocido";

  return (
    <div className='p-5 max-sm:p-8'>
      <h2 className="text-xl font-bold mb-4 text-gray-200 max-sm:text-center">Mis Mascotas</h2>
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
