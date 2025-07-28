'use client';
import { Button } from '@/components/Core/Button';
import { endPointChats, endPointPets } from '@/lib/api';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const ChatModal = ({ onClose, pet, currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [receiverId, setReceiverId] = useState(null);

    // Obtener ID del dueño del perrito
    useEffect(() => {
        const getPetOwner = async () => {
            try {
                if (!pet?.id && !pet?.petId) {
                    console.error("ID de la mascota no encontrado en el objeto pet");
                    return;
                }
                const petId = pet.petId || pet.id;
                const res = await axios.get(`${endPointPets}/${petId}`);
                setReceiverId(res.data.userId);
            } catch (error) {
                console.error('Error trayendo dueño del perro:', error);
            }
        };

        getPetOwner();
    }, [pet]);

    // Obtener los mensajes entre currentUser y receiverId
    useEffect(() => {
        if (!receiverId || !currentUser?.id) return;

        const fetchMessages = async () => {
            try {
                const res = await axios.get(endPointChats);
                const filtered = res.data.filter(msg =>
                    (msg.senderId === currentUser.id && msg.receiverId === receiverId) ||
                    (msg.senderId === receiverId && msg.receiverId === currentUser.id)
                );
                setMessages(filtered);
            } catch (error) {
                console.error('Error trayendo mensajes:', error);
            }
        };

        fetchMessages();
    }, [receiverId, currentUser]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const messageData = {
            senderId: currentUser.id,
            receiverId,
            message: newMessage,
            timestamp: new Date().toISOString()
        };

        try {
            const res = await axios.post(endPointChats, messageData);
            setMessages(prev => [...prev, res.data]);
            setNewMessage('');
        } catch (error) {
            console.error('Error enviando mensaje:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-black/30 rounded-xl w-[90%] max-w-md p-5 shadow-xl relative backdrop-blur-lg">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">X</button>
                <h2 className="text-xl font-bold mb-4 text-center">Chat sobre {pet.name}</h2>

                <div className="h-64 overflow-y-auto rounded-lg p-3 mb-4 bg-black/20 space-y-2">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`p-2 rounded-lg max-w-[80%] ${msg.senderId === currentUser.id ? 'bg-gray-600/80 text-white ml-auto' : 'bg-white/80 text-black'}`}
                        >
                            {msg.message}
                            <div className="text-[10px] text-right mt-1">
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 bg-black/20 p-2 rounded-lg">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        className="flex-1 rounded-lg px-3 py-2 text-white outline-none placeholder:text-gray-200" 
                    />
                    <Button
                        fit
                        onClick={handleSendMessage}
                        className="bg-white/30 hover:bg-white/50 text-white px-4 py-2"
                    >
                        Enviar
                    </Button>
                </div>
            </div>
        </div>
    );
};
