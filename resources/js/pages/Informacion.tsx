import { useState } from 'react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';

interface Noticia {
    id: number;
    titulo: string;
    contenido: string;
    imagen?: string;
    created_at: string;
}

interface InformacionProps {
    novedades: Noticia[];
    horario: Noticia | null;
    ubicacion: Noticia | null;
    general: Noticia | null;
}

export default function Informacion({ novedades, horario, ubicacion, general }: InformacionProps) {
    const [visibles, setVisibles] = useState(6);
    
    const noticiasMostradas = novedades.slice(0, visibles);
    const tieneMasNoticias = novedades.length > visibles;

    const cargarMas = () => {
        setVisibles((prev) => prev + 6);
    };

    const direccionTexto = ubicacion?.titulo || "Av. de las Piletas, 13, 11540 Sanlúcar de Barrameda, Cádiz";
    const srcMapaPublico = `https://maps.google.com/maps?q=${encodeURIComponent(direccionTexto)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-pink-500 selection:text-white">
            <Header />

            <section className="pt-52 pb-24 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="mb-16 text-center lg:text-left">
                        <span className="text-xs font-black tracking-widest text-pink-500 uppercase block mb-3">
                            Urban Beat Feed
                        </span>
                        <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter italic text-black">
                            Últimas <span className="text-pink-500">Noticias</span>
                        </h1>
                    </div>

                    {noticiasMostradas.length > 0 ? (
                        <div className="space-y-12">
                            {noticiasMostradas.map((n) => (
                                <div 
                                    key={n.id} 
                                    className="bg-gray-50 rounded-[40px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 md:grid-cols-3 gap-8"
                                >
                                    {n.imagen && (
                                        <div className="w-full h-80 md:h-full min-h-[280px] relative overflow-hidden bg-zinc-100">
                                            <img 
                                                src={`/storage/${n.imagen}`} 
                                                alt={n.titulo}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-103"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/images/placeholder-artista.jpg';
                                                }}
                                            />
                                        </div>
                                    )}
                                    
                                    <div className={`p-8 md:p-10 flex flex-col justify-between ${n.imagen ? 'md:col-span-2' : 'md:col-span-3'}`}>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black tracking-widest text-pink-500 uppercase bg-pink-50 px-3 py-1 rounded-full">
                                                    Última hora
                                                </span>
                                                <span className="text-xs font-bold text-gray-400">
                                                    {new Date(n.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h3 className="text-3xl font-black uppercase tracking-tight text-black leading-none">
                                                {n.titulo}
                                            </h3>
                                            <p className="text-gray-600 text-base font-medium whitespace-pre-line leading-relaxed">
                                                {n.contenido}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {tieneMasNoticias && (
                                <div className="pt-8 text-center">
                                    <button 
                                        onClick={cargarMas}
                                        className="px-12 py-5 bg-black text-white font-black uppercase text-xs tracking-widest italic rounded-full hover:bg-pink-500 hover:scale-105 transition-all duration-300 shadow-lg"
                                    >
                                        Mostrar más novedades
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
                            <p className="text-gray-400 font-bold italic text-base uppercase tracking-wider">
                                El canal de novedades está tranquilo por ahora.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="mb-16 text-center lg:text-left">
                        <span className="text-xs font-black tracking-widest text-pink-500 uppercase block mb-3">
                            Guía Práctica
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic text-black">
                            El Recinto <span className="text-pink-500">Urban Beat</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                        <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm transition-all">
                            <span className="text-xs font-black text-pink-500 uppercase tracking-widest block mb-2">
                                📅 Escenario Único
                            </span>
                            <h3 className="text-2xl font-black uppercase text-black mb-4">
                                {horario ? horario.titulo : 'Programa de Conciertos'}
                            </h3>
                            <p className="text-gray-600 text-sm font-medium whitespace-pre-line leading-relaxed">
                                {horario ? horario.contenido : 'Los horarios de apertura y actuaciones están siendo coordinados.'}
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm transition-all">
                            <span className="text-xs font-black text-pink-500 uppercase tracking-widest block mb-2">
                                📣 Control de Accesos
                            </span>
                            <h3 className="text-2xl font-black uppercase text-black mb-4">
                                {general ? general.titulo : 'Normas Generales'}
                            </h3>
                            <p className="text-gray-600 text-sm font-medium whitespace-pre-line leading-relaxed">
                                {general ? general.contenido : 'Las condiciones generales se actualizarán próximamente.'}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <span className="text-xs font-black text-pink-500 uppercase tracking-widest block mb-1">
                                    📍 Dirección Oficial
                                </span>
                                <h3 className="text-2xl font-black uppercase text-black">
                                    {direccionTexto}
                                </h3>
                            </div>
                            <a 
                                href={`https://maps.google.com/maps?q=${encodeURIComponent(direccionTexto)}`}
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center justify-center px-6 py-3 bg-zinc-900 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-pink-500 transition-colors whitespace-nowrap shadow-sm"
                            >
                                Abrir en Google Maps
                            </a>
                        </div>

                        <div className="w-full h-[500px] rounded-[40px] overflow-hidden border-4 border-white bg-gray-200 shadow-md">
                            <iframe 
                                src={srcMapaPublico} 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen={true} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}