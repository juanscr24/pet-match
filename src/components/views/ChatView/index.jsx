"use client";
// importaciones necesarias
import { useEffect, useState } from "react";
import axios from "axios";
import { endPointChats, endPointUsers } from "@/lib/api";
import { Button } from "@/components/Core/Button";
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SendIcon from '@mui/icons-material/Send';

// Se declara una Arrow function 
export const ChatView = () => {
    // Estados para manejar.
    const [currentUser, setCurrentUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [receiver, setReceiver] = useState(null);

    // Obtener el usuario actual desde localStorage
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
        return <div className="text-center mt-10 text-white">Cargando usuario...</div>;
    }

    return (
        <div className="flex max-sm:flex-col p-5 gap-1 text-white h-[100%] justify-center items-center backdrop-blur-lg max-sm:gap-6">
            {/* Lista de usuarios */}
            <div className="overflow-y-auto w-[30%] max-xl:w-[40%] px-3 max-lg:w-[60%] gap-2 max-sm:w-full max-sm:h-44 max-sm:pb-5 rounded-lg flex flex-col items-center shadow-xl pt-3 bg-black/40 h-[100%]">
                <h2 className="text-lg font-semibold">Chats</h2>
                {getChatUsers().map(user => (
                    <div
                        key={user.id}
                        onClick={() => setReceiver(user)}
                        className={`cursor-pointer rounded w-full flex gap-2 p-2 hover:bg-white/50 transition ${receiver?.id === user.id ? "bg-white/30 font-bold w-[90%]" : ""
                            }`}
                    >
                        <AccountCircleIcon />
                        {user.name}
                    </div>
                ))}
            </div>

            {/* Mensajes */}
            <div className="flex flex-col w-[100%] rounded-lg gap-1 h-[100%]">
                {receiver ? (
                    <>
                        <div className="shadow-xl bg-gray-600/80 font-semibold text-lg rounded-lg p-3 flex gap-2 items-center">
                            <AccountCircleIcon />
                            {receiver.name}
                        </div>
                        <div className="pt-5 overflow-y-auto shadow-xl bg-black/40 space-y-2 rounded-lg py-2 px-4 h-[100%]">
                            {getMessagesWithUser(receiver.id).map(msg => (
                                <div
                                    key={msg.id}
                                    className={`max-w-xs max-lg:w-[70%] max-sm:w-[80%] rounded-lg ${msg.senderId === currentUser.id
                                            ? "bg-gray-600/80 text-white ml-auto py-1 px-2"
                                            : "bg-white/80 text-black py-1 px-2"
                                        }`}
                                >
                                    {msg.message}
                                    <div className="text-[10px] text-right opacity-70">
                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-2 flex items-center gap-2 shadow-xl bg-black/40 rounded-lg">
                            <input
                                type="text"
                                className="flex-1 outline-none rounded-lg p-1 text-white placeholder:text-gray-100"
                                placeholder="Escribe un mensaje..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <Button
                                fit
                                onClick={sendMessage}
                                className="bg-white/30 hover:bg-white/50 text-white rounded-md p-2"
                            >
                                Enviar
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-white">
                        Selecciona un chat para empezar
                    </div>
                )}
            </div>
        </div>
    );
};
