'use client';
import { useEffect, useState } from 'react';

export function useUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Solo se ejecuta en el cliente
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, []);

    return { user };
}
