# 🐶 Pet-Match

**Pet-Match** es una aplicación tipo Tinder para adopción de perros. Los usuarios pueden ver tarjetas de perritos extraídas desde [TheDogAPI](https://thedogapi.com), darles "like" o "dislike", y crear matches para gestionar adopciones. También cuenta con autenticación por roles (usuario/admin), protección de rutas y almacenamiento de datos usando `json-server`.

Además, **la aplicación integra TheDogAPI**, una API externa que proporciona información sobre razas, temperamento, peso y esperanza de vida de cada peludito.

---

## 🚀 Tecnologías utilizadas

- [Next.js 15](https://nextjs.org/)
- [React](https://react.dev/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [json-server](https://github.com/typicode/json-server)
- [TheDogAPI](https://thedogapi.com) 🐾
- LocalStorage (para persistencia de sesión)
- UUID (para generar IDs únicos)

---

## 🎯 Funcionalidades

- ✅ Login y Registro con persistencia de sesión
- ✅ Roles de usuario (`admin` y `user`)
- ✅ Rutas protegidas según rol
- ✅ Tarjetas dinámicas con perritos (API externa)
- ✅ Botones de "Like" y "Dislike"
- ✅ Registro de matches en `json-server`
- ✅ Página de Dashboard con botón de Logout
- ✅ Estilos limpios con Tailwind

---

## 📁 Estructura del proyecto
/app → Rutas y navegación con Expo Router

/components → Componentes atomizados (Cards, Inputs, Layouts)

/lib → Funciones para auth, API y lógica de matches

/views → Vistas como LoginView, RegisterView, DashboardView

/data/db.json → Base de datos simulada con json-server

/public → Assets como favicon, imágenes

---

## 🧪 Base de datos simulada (json-server)

Tu base de datos `db.json` incluye:

- `users`: Usuarios registrados
- `pets`: Mascotas registradas por usuarios
- `matches`: Registros de likes/dislikes
- `adoptionRequests`: Solicitudes de adopción

---

## 🐾 TheDogAPI

El proyecto se conecta con [TheDogAPI](https://thedogapi.com) para mostrar perros aleatorios. Por cada perro se extraen datos como:

- Nombre de la raza
- Temperamento
- Peso aproximado
- Esperanza de vida
- Imagen

Si alguno de estos datos no está disponible, la app lo reemplaza con un mensaje amigable por defecto.

---

## 🛠️ Instalación y ejecución

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### 1. Clona el proyecto
```bash
git clone https://github.com/tu-usuario/pet-match.git
cd pet-match
```
### 2.  Instala dependencias
```bash 
npm install
# o
yarn install
```
### 2.  Ejecuta el servidor de desarrollo
```bash
npm run dev
# o
yarn dev
```

Abre http://localhost:3000 en tu navegador.

### 4. Levanta el json-server
```bash
npx json-server --watch db.json --port 3001
```
## Despliegue
La forma más sencilla de desplegar tu app de Next.js es con Vercel.

Consulta la documentación de despliegue para más detalles.