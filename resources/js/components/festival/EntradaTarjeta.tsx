import React from 'react';
import { HiPlus, HiMinus, HiOutlinePencil, HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import BotonCarrito from './BotonCarrito';

interface EntradaTarjetaProps {
    entrada: any;
    esAdmin: boolean;
    cantidadActual: number;
    procesandoId: number | null;
    onUpdateCant: (id: number, delta: number) => void;
    onAniadirAlCarrito: (id: number) => void;
    onCambiarVisibilidad: (id: number) => void;
    onIrAEditar: (id: number) => void;
}

export default function EntradaTarjeta({
    entrada,
    esAdmin,
    cantidadActual,
    procesandoId,
    onUpdateCant,
    onAniadirAlCarrito,
    onCambiarVisibilidad,
    onIrAEditar
}: EntradaTarjetaProps) {
    const estaProcesando = procesandoId === entrada.id;

    return (
        <div
            className={`relative p-8 rounded-3xl border-2 border-black flex flex-col h-full bg-white shadow-xl transition-all hover:-translate-y-2 
                ${entrada.esta_oculta ? 'opacity-70 grayscale-[0.5] border-dashed bg-gray-50' : ''}`}
        >
            {esAdmin && (
                <div className="absolute -top-4 -right-4 flex flex-col gap-2 z-30">
                    <button
                        type="button"
                        onClick={() => onCambiarVisibilidad(entrada.id)}
                        className={`p-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-90 
                            ${entrada.esta_oculta ? 'bg-black text-white' : 'bg-yellow-400 text-black'}`}
                    >
                        {entrada.esta_oculta ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                    </button>
                    <button
                        type="button"
                        onClick={() => onIrAEditar(entrada.id)}
                        className="p-3 bg-pink-500 text-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-90 hover:bg-black"
                    >
                        <HiOutlinePencil size={20} />
                    </button>
                </div>
            )}

            <div className="mb-4">
                <span className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {entrada.zona.nombre}
                </span>
            </div>

            <h2 className="text-3xl font-black uppercase italic mb-1 leading-none">
                {entrada.tipo_entrada.nombre}
            </h2>

            <div className="text-5xl font-black text-black mb-5 mt-2">
                {Math.floor(entrada.precio)}€
            </div>

            {entrada.stock > 0 ? (
                <div className="mt-auto">
                    {/* Selector de Cantidades */}
                    <div className="flex items-center justify-between bg-gray-100 rounded-full p-2 mb-4">
                        <button
                            type="button"
                            onClick={() => onUpdateCant(entrada.id, -1)}
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-pink-500 transition-all active:scale-90"
                        >
                            <HiMinus />
                        </button>
                        <span className="font-black text-lg">{cantidadActual}</span>
                        <button
                            type="button"
                            onClick={() => onUpdateCant(entrada.id, 1)}
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-pink-500 transition-all active:scale-90"
                        >
                            <HiPlus />
                        </button>
                    </div>

                    <BotonCarrito 
                        onClick={() => onAniadirAlCarrito(entrada.id)}
                        texto={estaProcesando ? 'Añadiendo...' : 'Añadir al carrito'}
                        disabled={estaProcesando}
                        size="md"
                    />
                </div>
            ) : (
                <div className="mt-auto relative overflow-hidden rounded-2xl border-2 border-dashed border-red-600 bg-gray-50 p-6 flex items-center justify-center">
                    <h2 className="text-red-600 text-4xl font-black uppercase italic tracking-tighter transform -rotate-6 select-none">
                        Agotada
                    </h2>
                </div>
            )}
        </div>
    );
}