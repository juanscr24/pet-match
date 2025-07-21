# PET MARCH

## 🐶 Pet-Match
Pet-Match es una aplicación enfocada en facilitar la adopción de perros en Colombia con un sistema de match, un país con un alto índice de perros en situación de calle o abandono. Con esta herramienta, buscamos conectar a usuarios interesados en adoptar con perritos que necesitan un hogar, a través de una interfaz amigable, ágil y segura.

## ❗ Problema
En Colombia, miles de perros viven en condición de abandono, expuestos a maltrato, hambre y enfermedades. A pesar de los esfuerzos de fundaciones y rescatistas, muchas veces no logran encontrar adoptantes adecuados debido a la falta de visibilidad y plataformas eficientes para promover la adopción.

## 💡 Solución
Pet-Match es una app interactiva que conecta a usuarios con perros en adopción de forma sencilla y segura. Permite visualizar perros con datos reales extraídos desde TheDogAPI, gestionar "likes" y "matches", y llevar un registro de las solicitudes de adopción. Cuenta con autenticación por roles, rutas protegidas, persistencia de sesión y backend simulado con json-server.

## 🚀 Tecnologías utilizadas
Next.js 15

React

Axios

Tailwind CSS

json-server

TheDogAPI 🐾

LocalStorage

UUID

## 🎯 Funcionalidades principales
Login y Registro con persistencia de sesión

Roles de usuario (admin y user)

Rutas protegidas según rol

Tarjetas dinámicas de perritos (API externa)

Botones de Like y Dislike

Registro de matches en json-server

Solicitudes de adopción

Dashboard personalizado y botón de Logout

Estilos modernos con Tailwind

## 🗂️ Estructura del proyecto
/app → Rutas y navegación

/components → Componentes reutilizables

/lib → Lógica de autenticación, API y matches

/views → Vistas (Login, Registro, Dashboard)

/data/db.json → Base de datos simulada

/public → Assets como imágenes y favicon

## 🐾 Integración con TheDogAPI
Por cada perrito se extraen los siguientes datos desde TheDogAPI:

Raza

Temperamento

Peso aproximado

Esperanza de vida

Imagen

Si algún dato no está disponible, la app lo reemplaza con un mensaje por defecto amigable.

## 🧪 Base de datos simulada (json-server)
El archivo db.json simula el backend de la aplicación con las siguientes colecciones:

users

pets

matches

adoptionRequests

## 🛠️ Instalación y ejecución local
### Clona el repositorio

Copiar y pegar
```bash
git clone https://github.com/tu-usuario/pet-match.git

cd pet-match
```
### Instala las dependencias

Copiar y pegar

```bash
npm install
# o
yarn install
```
### Ejecuta la aplicación en modo desarrollo


Copiar y pegar

```bash
npm run dev
# o
yarn dev
```
La app estará disponible en: `http://localhost:3000`

### Inicia el servidor de la base de datos simulada (json-server)


Copiar y pegar

```bash
npm run server
# o
npx json-server --watch data/db.json --port 3001
```
La API local estará disponible en: `http://localhost:3001`


## ⚠️ En caso de errores relacionados con módulos
Puedes forzar una reinstalación limpia ejecutando:

Copiar y pegar

```bash
rm -rf node_modules package-lock.json
# and
npm install 
```
