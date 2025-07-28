// components/About/CounterStats.jsx
"use client";
import CountUp from "react-countup";

export const CounterStats = () => {
    return (
        <section className="text-center my-10 space-y-6">
            <p className="text-3xl text-white font-bold">
                <CountUp end={2043} duration={3} />+ mascotas adoptadas gracias a PetMatch
            </p>

            <p className="text-xl text-red-400 font-semibold">
                En Barranquilla, más de <CountUp end={70000} duration={3} /> perros y <CountUp end={30000} duration={3} /> gatos han sido abandonados según datos recientes.
            </p>

            <p className="text-base text-white max-w-2xl mx-auto">
                Con nuestra plataforma <strong>PetMatch</strong>, buscamos reducir esta alarmante cifra conectando familias con mascotas sin hogar,
                promoviendo la adopción responsable y la conciencia animal. ¡Juntos podemos hacer la diferencia!
            </p>
        </section>
    );
};
