"use client";
import { useState } from "react";
import { Input } from "@/components/Core/Input";
import { Button } from "@/components/Core/Button";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Textarea } from "@/components/Core/TextTarea";
import Link from "next/link";

export const AboutUsView = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Gracias por tu mensaje 🐾");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen text-white px-6 py-10 sm:px-10 md:px-20 flex justify-center items-center">
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl w-full space-y-10">
                <h1 className="text-xl md:text-xl font-bold text-center text-white tracking-wide">
                    Sobre Nosotros
                </h1>

                <section className="space-y-6">
                    <p className="text-gray-200 text-justify">
                        Pet-Match es una aplicación diseñada para facilitar la adopción responsable de perros en Colombia. En un país con miles de peluditos en situación de abandono, nuestra plataforma utiliza un sistema de "match" que conecta a adoptantes con perros que buscan un hogar. A través de una interfaz intuitiva y segura, hacemos que el proceso de adopción sea más humano, fácil y rápido.
                    </p>

                    <div>
                        <h2 className="text-lg font-bold mb-2">Misión</h2>
                        <p className="text-gray-200 text-justify">
                            Nuestra misión es reducir el abandono y el sufrimiento de perros en Colombia mediante una plataforma digital que facilite la adopción responsable. En Pet-Match trabajamos para conectar a personas dispuestas a adoptar con perros que buscan un hogar, a través de un sistema de emparejamiento intuitivo, seguro y confiable.
                            Nos enfocamos en crear experiencias humanas, transparentes y empáticas, promoviendo la tenencia responsable y fomentando una cultura de respeto hacia los animales. Queremos hacer de la adopción no solo una opción, sino la mejor elección para cambiar vidas, tanto humanas como caninas.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold mb-2">Visión</h2>
                        <p className="text-gray-200 text-justify">
                            Nuestra visión es ser la plataforma de adopción animal más confiable, innovadora y accesible de Colombia y América Latina. Aspiramos a transformar la manera en que las personas adoptan, usando la tecnología como puente entre el corazón de quienes buscan una compañía fiel y los perros que necesitan una segunda oportunidad.
                            Soñamos con un futuro donde cada perro abandonado encuentre un hogar lleno de amor, cuidado y dignidad. Buscamos inspirar una comunidad consciente, solidaria y comprometida con el bienestar animal, en la que adoptar sea un acto de amor tan natural como necesario.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold mb-4">Valores</h2>
                        <ul className="list-disc list-inside text-gray-200 space-y-2">
                            <li><strong className="text-white">Empatía:</strong> Conectamos con cada perro y adoptante.</li>
                            <li><strong className="text-white">Responsabilidad:</strong> Promovemos decisiones conscientes.</li>
                            <li><strong className="text-white">Transparencia:</strong> Información clara y verificada.</li>
                            <li><strong className="text-white">Innovación:</strong> Tecnología para el bienestar animal.</li>
                            <li><strong className="text-white">Compromiso social:</strong> Por una Colombia sin abandono.</li>
                        </ul>
                    </div>
                </section>

                {/* 📨 Formulario de contacto */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold">¿Quieres contactarnos?</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex justify-cente gap-5">
                            <Input className='w-full bg-white/10' white name="name" placeholder="Tu nombre" value={form.name} onChange={handleChange} required />
                            <Input className='w-full bg-white/10' white name="email" placeholder="Tu correo" value={form.email} onChange={handleChange} required type="email" />
                        </div>
                        <Textarea className="bg-white/10" white placeholder='Escribe tu mensaje...' />
                        <Button type="submit" className="bg-black/50 hover:bg-black/70">Enviar</Button>
                    </form>
                </section>

                {/* 🔗 Redes sociales */}
                <section className="flex justify-center gap-12 mt-6 text-white">
                    <Link href='https://facebook.com' target="_blank">
                        <FacebookIcon className="hover:text-blue-500 transition-all " />
                    </Link>
                    <Link href='https://instagram.com' target="_blank">
                        <InstagramIcon className="hover:text-pink-500 transition-all" />
                    </Link>
                    <Link href='https://twitter.com' target="_blank">
                        <TwitterIcon className="hover:text-sky-400 transition-all" />
                    </Link>
                    <Link href='https://youtube.com' target="_blank">
                        <YouTubeIcon className="hover:text-red-500 transition-all" />
                    </Link>
                </section>
            </div>
        </div>
    );
};
