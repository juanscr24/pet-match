import api from './axios';

// Logica del login
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

// logica del Cerrar Sesion
export function logout() {
    localStorage.removeItem('user');
    window.location.href = '/login'; 
}

// Funcion para obtener Usuario activo en el Local Storage
export function getUser() {
    if (typeof window === 'undefined') return null;
    return JSON.parse(localStorage.getItem('user'));
}

// Funcion de Autentificacion 
export function isAuthenticated() {
    return !!getUser();
}
