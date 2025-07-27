"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { endPointChats, endPointUsers } from "@/lib/api";

export const ChatView = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [receiver, setReceiver] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = JSON.parse(localStorage.getItem("user"));
            setCurrentUser(user);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resChats, resUsers] = await Promise.all([
                    axios.get(endPointChats),
                    axios.get(endPointUsers),
                ]);
                setChats(resChats.data);
                setUsers(resUsers.data);
            } catch (error) {
                console.error("Error cargando datos:", error);
            }
        };

        fetchData();
    }, []);

    const getChatUsers = () => {
        const userIds = chats
            .filter(chat => chat.senderId === currentUser?.id || chat.receiverId === currentUser?.id)
            .map(chat => (chat.senderId === currentUser?.id ? chat.receiverId : chat.senderId));

        const uniqueIds = [...new Set(userIds)];
        return users.filter(user => uniqueIds.includes(user.id));
    };

    const getMessagesWithUser = (receiverId) => {
        return chats.filter(
            chat =>
                (chat.senderId === currentUser?.id && chat.receiverId === receiverId) ||
                (chat.senderId === receiverId && chat.receiverId === currentUser?.id)
        );
    };

    const sendMessage = async () => {
        if (!message.trim() || !receiver) return;

        const newMessage = {
            id: crypto.randomUUID().slice(0, 4),
            senderId: currentUser.id,
            receiverId: receiver.id,
            message,
            timestamp: new Date().toISOString(),
        };

        try {
            await axios.post(endPointChats, newMessage);
            setChats(prev => [...prev, newMessage]);
            setMessage("");
        } catch (error) {
            console.error("Error enviando mensaje:", error);
        }
    };

    if (!currentUser) {
        return <div className="text-center mt-10 text-gray-600">Cargando usuario...</div>;
    }

    return (
        <div className="flex h-[80vh] border rounded-lg overflow-hidden shadow-lg mt-4">
            {/* Lista de usuarios */}
            <div className="w-1/3 bg-gray-100 border-r p-4 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Mis Chats</h2>
                {getChatUsers().map(user => (
                    <div
                        key={user.id}
                        onClick={() => setReceiver(user)}
                        className={`cursor-pointer p-2 rounded hover:bg-blue-200 transition ${receiver?.id === user.id ? "bg-blue-300 font-bold" : ""
                            }`}
                    >
                        {user.name}
                    </div>
                ))}
            </div>

            {/* Mensajes */}
            <div className="w-2/3 flex flex-col">
                {receiver ? (
                    <>
                        <div className="bg-white p-4 border-b font-semibold text-lg">
                            Chat con {receiver.name}
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-2">
                            {getMessagesWithUser(receiver.id).map(msg => (
                                <div
                                    key={msg.id}
                                    className={`max-w-xs px-3 py-2 rounded-lg ${msg.senderId === currentUser.id
                                            ? "bg-blue-500 text-white ml-auto"
                                            : "bg-gray-300 text-black"
                                        }`}
                                >
                                    {msg.message}
                                    <div className="text-[10px] text-right opacity-70">
                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 border-t flex items-center gap-2 bg-white">
                            <input
                                type="text"
                                className="flex-1 border rounded-lg px-3 py-2"
                                placeholder="Escribe un mensaje..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                            >
                                Enviar
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        Selecciona un chat para empezar
                    </div>
                )}
            </div>
        </div>
    );
};
