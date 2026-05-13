import { Head, router, usePage } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import NombreArtista from '@/components/festival/NombreArtista';

interface Artista {
    id: number;
    nombre: string;
    imagen: string;
    es_headliner: boolean;
    orden: number;
    visible?: boolean; // Añadimos esto para el control de ocultar
}

interface Dia {
    id: number;
    fecha: string;
    artistas: Artista[];
}

interface Props {
    programacion: Dia[];
    auth: {
        user: any;
    };
}

export default function Cartel({ programacion, auth }: Props) {
    
    // Función para manejar el borrado/ocultado
    const handleOcultar = (id: number) => {
        if (confirm('¿Seguro que quieres ocultar este artista del cartel?')) {
            router.delete(`/admin/artistas/${id}`, {
                preserveScroll: true
            });
        }
    };

    // Función para ir a editar
    const handleEditar = (id: number) => {
        router.get(`/admin/artistas/${id}/edit`);
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Head title="Cartel - UrbanBeat" />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="text-center mb-16">
                        <h1 className="text-black text-7xl md:text-9xl font-black italic uppercase tracking-tighter mb-4">
                            CARTEL <span className="text-pink-500">2026</span>
                        </h1>
                        <div className="flex justify-center items-center gap-4">
                            <div className="h-[2px] w-12 bg-black/20"></div>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                                UrbanBeat Festival 2026
                            </p>
                            <div className="h-[2px] w-12 bg-black/20"></div>
                        </div>
                    </div>

                    <div className="space-y-24">
                        {programacion.map((dia) => (
                            <section key={dia.id}>
                                <div className="flex items-center gap-4 mb-10">
                                    <h2 className="text-4xl font-black uppercase italic tracking-tighter whitespace-nowrap">
                                        {new Date(dia.fecha).toLocaleDateString('es-ES', { 
                                            day: 'numeric', 
                                            month: 'long' 
                                        })}
                                    </h2>
                                    <div className="h-[2px] w-full bg-black/10"></div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {dia.artistas.map((artista) => (
                                        <div 
                                            key={artista.id}
                                            className={`group relative overflow-hidden rounded-[2.5rem] bg-black border-2 border-black transition-all duration-500 hover:-translate-y-2 shadow-xl ${
                                                artista.es_headliner ? 'col-span-2 row-span-2' : 'col-span-1'
                                            }`}
                                        >
                                            {/* Botones de Admin - Solo visibles si hay usuario logueado */}
                                            {auth.user && (
                                                <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button 
                                                        onClick={() => handleEditar(artista.id)}
                                                        className="bg-white text-black p-2 rounded-full hover:bg-pink-500 hover:text-white transition-colors"
                                                        title="Editar Artista"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                                    </button>
                                                    <button 
                                                        onClick={() => handleOcultar(artista.id)}
                                                        className="bg-white text-red-600 p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors"
                                                        title="Ocultar Artista"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                                    </button>
                                                </div>
                                            )}

                                            <div className="aspect-[4/5] h-full w-full">
                                                <img 
                                                    src={artista.imagen} 
                                                    alt={artista.nombre}
                                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                                                />
                                            </div>

                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6 md:p-10">
                                                <NombreArtista 
                                                    nombre={artista.nombre} 
                                                    esHeadliner={artista.es_headliner} 
                                                />
                                                <div className="h-1 w-0 bg-pink-500 mt-2 group-hover:w-full transition-all duration-500"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}