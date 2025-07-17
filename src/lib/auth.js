import api from './axios';

export async function login({ email, password }) {
    try {
        const res = await api.get(`/users`, {
            params: { email, password },
        });

        if (res.data.length === 0) {
            throw new Error('Usuario o contraseña incorrectos');
        }

        const user = res.data[0];
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (err) {
        throw new Error('Error al iniciar sesión');
    }
}

export function logout() {
    localStorage.removeItem('user');
    window.location.href = '/login'; 
}


export function getUser() {
    if (typeof window === 'undefined') return null;
    return JSON.parse(localStorage.getItem('user'));
}

export function isAuthenticated() {
    return !!getUser();
}

