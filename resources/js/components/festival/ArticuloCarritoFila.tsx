import React from 'react';
import { HiOutlineTrash, HiMinusSmall, HiPlusSmall } from "react-icons/hi2";

// Definimos la interfaz exacta de lo que necesita este componente para funcionar
interface ArticuloCarrito {
    id: number;
    carrito_id: string;
    tipo: 'entrada' | 'merchandising';
    nombre: string;
    detalle: string;
    precio: number;
    cantidad: number;
    imagen: string | null;
}

interface ArticuloCarritoFilaProps {
    articulo: ArticuloCarrito;
    onActualizarCantidad: (carritoId: string, nuevaCantidad: number) => void;
    onEliminarArticulo: (carritoId: string) => void;
}

export default function ArticuloCarritoFila({ 
    articulo, 
    onActualizarCantidad, 
    onEliminarArticulo 
}: ArticuloCarritoFilaProps) {
    return (
        <div className="group py-10 first:pt-0 flex flex-col md:flex-row md:items-center gap-8">
            
            {articulo.imagen && (
                <div className="w-20 h-20 border-2 border-black bg-white flex-shrink-0 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <img src={articulo.imagen} alt={articulo.nombre} className="w-full h-full object-cover" />
                </div>
            )}

            <div className="flex-1">
                <div className="inline-block bg-black text-white px-2 py-0.5 mb-3">
                    <span className="text-[11px] font-black uppercase tracking-widest">
                        {articulo.detalle}
                    </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight leading-none group-hover:text-pink-500 transition-colors">
                    {articulo.nombre}
                </h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                    Ref: {articulo.carrito_id.toUpperCase()} — {articulo.precio}€ / ud
                </p>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-10">
                <div className="flex items-center border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <button 
                        type="button"
                        onClick={() => onActualizarCantidad(articulo.carrito_id, articulo.cantidad - 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-black hover:text-white transition-colors border-r-2 border-black"
                    >
                        <HiMinusSmall />
                    </button>
                    
                    <span className="w-10 text-center font-black text-base italic">{articulo.cantidad}</span>
                    
                    <button 
                        type="button"
                        onClick={() => onActualizarCantidad(articulo.carrito_id, articulo.cantidad + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-black hover:text-white transition-colors border-l-2 border-black"
                    >
                        <HiPlusSmall />
                    </button>
                </div>
                
                <div className="text-right min-w-[100px]">
                    <p className="text-2xl font-black italic tracking-tighter">
                        {(articulo.precio * articulo.cantidad).toFixed(2)}€
                    </p>
                </div>

                <button 
                    type="button"
                    onClick={() => onEliminarArticulo(articulo.carrito_id)}
                    className="text-gray-300 hover:text-red-600 transition-colors"
                >
                    <HiOutlineTrash size={22} />
                </button>
            </div>
        </div>
    );
}