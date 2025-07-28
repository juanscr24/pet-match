// app/layout.js
import './globals.css'
import MainLayout from './MainLayout'

export const metadata = {
  title: "Pet Match",
  description: "Pet-Match es una aplicación diseñada para facilitar la adopción responsable de perros en Colombia. En un país con miles de peluditos en situación de abandono, nuestra plataforma utiliza un sistema de match que conecta a adoptantes con perros que buscan un hogar. A través de una interfaz intuitiva y segura, hacemos que el proceso de adopción sea más humano, fácil y rápido",
  keywords: ["NextJs", "css", "CRUD", "match" , "pets", "PetMatch"], 
  authors: [
    { name: "Juan Cardona" },
    { name: "Daniel Rojas" },
    { name: "Forlan Ondoñez" },
    { name: "Allison Segrera" },
    { name: "Wilson Delgado" }
  ], 
  creator: "Juan Sebastian Cardona Rengifo",
  themeColor: "#ffffff",
  robots: "index, follow", 
  applicationName: "Pet Match"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
