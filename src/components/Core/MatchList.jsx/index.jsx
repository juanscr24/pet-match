'use client';
import { useState, useEffect } from "react";
import { CardMatch } from "../CardMatch";


export function MatchList() {
    const [matches, setMatches] = useState([]);

    // Al montar, cargamos los matches desde tu JSON‑server
    useEffect(() => {
        fetch("http://localhost:3001/matches")
            .then(res => res.json())
            .then(data => setMatches(data))
            .catch(err => console.error("Error al cargar matches:", err));
    }, []);

    const deleteMatch = id => {
        // 1) Actualiza el estado local
        setMatches(prev => prev.filter(m => m.id !== id));

        // 2) Notifica al servidor
        fetch(`http://localhost:3001/matches/${id}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) throw new Error("Error al eliminar del servidor");
            })
            .catch(err => {
                console.error(err);
                // Podría revertir el estado si quieres manejar errores
            });
    };

    return (
        <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 gap-5">
            {matches.map(match => (
                <CardMatch
                    key={match.id}
                    pet={{
                        id: match.id,
                        url: match.petInfo.url,
                        name: match.petInfo.name,
                        temperament: match.petInfo.temperament
                    }}
                    onDelete={deleteMatch}
                />
            ))}
        </div>
    );
}
