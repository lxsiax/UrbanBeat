import { Head, Link } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';

interface Props {
    entradas: any[];
    titulo?: string;
}

export default function Entradas({ entradas, titulo = "TICKETS" }: Props) {
    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Head title={`${titulo} - UrbanBeat`} />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-black text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-4">
                            {titulo} <span className="text-pink-500">2026</span>
                        </h1>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
                            ACCESO AL FESTIVAL URBANBEAT
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {entradas.map((entrada) => (
                            <div
                                key={entrada.id}
                                className="relative p-8 rounded-3xl border-2 border-black flex flex-col h-full bg-gray-50 shadow-2xl transition-transform hover:-translate-y-2"
                            >
                                <div className="mb-4">
                                    <span className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        {entrada.zona.nombre}
                                    </span>
                                </div>

                                <h2 className="text-3xl font-black uppercase italic mb-1">
                                    {entrada.tipo_entrada.nombre}
                                </h2>

                                <p className="text-pink-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-6">
                                    {entrada.tipo_entrada.dia
                                        ? new Date(entrada.tipo_entrada.dia.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
                                        : 'Abono Full Festival'
                                    }
                                </p>

                                <div className="text-5xl font-black text-black mb-8">
                                    {Math.floor(entrada.precio)}€
                                </div>

                                <ul className="flex-grow space-y-4 mb-10">
                                    <li className="text-[10px] font-black uppercase tracking-wider flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
                                        Zona: {entrada.zona.nombre}
                                    </li>
                                    {entrada.stock <= 0 && (
                                        <li className="text-[10px] font-black uppercase tracking-wider flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
                                            Estado: Agotado
                                        </li>
                                    )}
                                </ul>

                                <Link
                                    href={entrada.stock > 0 ? `/checkout/${entrada.id}` : '#'}
                                    className={`w-full py-4 rounded-full font-black uppercase tracking-widest text-center transition-all ${entrada.stock > 0
                                            ? 'bg-pink-500 text-white hover:bg-black'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    {entrada.stock > 0 ? 'Seleccionar' : 'Agotado'}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}