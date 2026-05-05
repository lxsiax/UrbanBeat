import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiPlus, HiMinus } from "react-icons/hi2";

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
                            Acceso al festival urbanbeat
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {entradas.map((entrada) => (
                            <TarjetaEntrada key={entrada.id} entrada={entrada} />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function TarjetaEntrada({ entrada }: { entrada: any }) {
    const [cantidad, setCantidad] = useState(1);

    const incrementar = () => {
        if (cantidad < entrada.stock) setCantidad(cantidad + 1);
    };

    const decrementar = () => {
        if (cantidad > 1) setCantidad(cantidad - 1);
    };

    const añadirAlCarrito = () => {
        router.post('/carrito/añadir-entrada', {
            entrada_id: entrada.id,
            cantidad: cantidad
        });
    };

    return (
        <div className="relative p-8 rounded-3xl border-2 border-black flex flex-col h-full bg-gray-50 shadow-2xl transition-transform hover:-translate-y-2">
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

            <div className="flex-grow">
                <ul className="space-y-4 mb-10">
                    <li className="text-[10px] font-black uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
                        Zona: {entrada.zona.nombre}
                    </li>
                </ul>
            </div>

            {entrada.stock > 0 ? (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between bg-white border-2 border-black rounded-full px-4 py-2">
                        <button 
                            onClick={decrementar}
                            className="p-1 hover:text-pink-500 transition-colors"
                        >
                            <HiMinus className="text-xl" />
                        </button>
                        <span className="font-black text-lg">{cantidad}</span>
                        <button 
                            onClick={incrementar}
                            className="p-1 hover:text-pink-500 transition-colors"
                        >
                            <HiPlus className="text-xl" />
                        </button>
                    </div>

                    <button
                        onClick={añadirAlCarrito}
                        className="w-full py-4 rounded-full bg-pink-500 text-white font-black uppercase tracking-widest text-center hover:bg-black transition-all"
                    >
                        Añadir al carrito
                    </button>
                </div>
            ) : (
                <div className="w-full py-4 rounded-full bg-gray-300 text-gray-500 font-black uppercase tracking-widest text-center cursor-not-allowed">
                    Agotado
                </div>
            )}
        </div>
    );
}