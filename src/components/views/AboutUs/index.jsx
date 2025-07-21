export const AboutUsView = () => {
    return (
        <div
            className="min-h-screen text-white px-6 py-10 sm:px-10 md:px-20 flex justify-center items-center"
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl w-full space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-white tracking-wide">
                    Sobre Nosotros
                </h1>

                <p className="text-lg leading-relaxed text-justify text-gray-200">
                    <strong className="">Pet-Match</strong> es una aplicación diseñada para facilitar la adopción responsable de perros en Colombia. En un país con miles de peluditos en situación de abandono, nuestra plataforma utiliza un sistema de "match" que conecta a adoptantes con perros que buscan un hogar. A través de una interfaz intuitiva y segura, hacemos que el proceso de adopción sea más humano, fácil y rápido.
                </p>

                <div>
                    <h2 className="text-lg font-bold mb-2">Misión</h2>
                    <p className="text-gray-200 leading-relaxed text-justify">
                        Nuestra misión es reducir el abandono y el sufrimiento de perros en Colombia mediante una plataforma digital que facilite la adopción responsable. Nos enfocamos en crear experiencias humanas, transparentes y empáticas, promoviendo la tenencia responsable y fomentando una cultura de respeto hacia los animales.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-bold mb-2">Visión</h2>
                    <p className="text-gray-200 leading-relaxed text-justify">
                        Aspiramos a ser la plataforma de adopción animal más confiable, innovadora y accesible de Colombia y América Latina. Soñamos con un futuro donde cada perro abandonado encuentre un hogar lleno de amor, cuidado y dignidad.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-bold mb-4">Valores de Pet-Match</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-200">
                        <li><span className="font-semibold text-white">Empatía:</span> Nos ponemos en el lugar de cada perro y adoptante.</li>
                        <li><span className="font-semibold text-white">Responsabilidad:</span> Promovemos la adopción consciente.</li>
                        <li><span className="font-semibold text-white">Transparencia:</span> Información clara y confiable.</li>
                        <li><span className="font-semibold text-white">Innovación:</span> Tecnología al servicio del bienestar animal.</li>
                        <li><span className="font-semibold text-white">Compromiso Social:</span> Trabajamos por una Colombia sin abandono animal.</li>
                    </ul>
                    
                </div>
            </div>
        </div>
    );
};
