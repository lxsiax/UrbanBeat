import React from 'react';
import { HiXMark } from "react-icons/hi2"; // Importamos un icono de cierre limpio

interface Props {
    onZonaSelect: (zona: string) => void;
    zonaActiva: string | null;
}

export default function MapaRecinto({ onZonaSelect, zonaActiva }: Props) {
    
    const quitarFiltro = () => {
        if (zonaActiva) {
            onZonaSelect(zonaActiva); 
        }
    };

    return (
        <div className="relative w-full">
            {zonaActiva && (
                <button
                    type="button"
                    onClick={quitarFiltro}
                    className="absolute top-4 right-4 z-10 bg-black text-white hover:bg-pink-500 px-4 py-2 text-[11px] font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2"
                >
                    <HiXMark size={16} />
                    Quitar Filtro ({zonaActiva})
                </button>
            )}

            {/* Tu mapa SVG original */}
            <svg viewBox="0 0 800 400" className="w-full h-auto drop-shadow-2xl">
                <rect x="300" y="0" width="200" height="50" fill="#000" />
                <text x="400" y="30" textAnchor="middle" fill="#fff" className="text-[10px] font-black uppercase">Escenario</text>

                <path 
                    d="M 250 60 L 550 60 L 600 150 L 200 150 Z" 
                    className={`cursor-pointer transition-all duration-300 ${zonaActiva === 'Front Stage' ? 'fill-pink-500' : 'fill-gray-200 hover:fill-pink-300'}`}
                    onClick={() => onZonaSelect('Front Stage')}
                />
                <text x="400" y="110" textAnchor="middle" className="pointer-events-none font-black uppercase text-[12px]">Front Stage</text>

                <rect 
                    x="150" y="160" width="500" height="120" 
                    className={`cursor-pointer transition-all duration-300 ${zonaActiva === 'Pista' ? 'fill-pink-500' : 'fill-gray-300 hover:fill-pink-300'}`}
                    onClick={() => onZonaSelect('Pista')}
                />
                <text x="400" y="225" textAnchor="middle" className="pointer-events-none font-black uppercase text-[12px]">Pista General</text>

                <path 
                    d="M 100 290 L 700 290 L 750 380 L 50 380 Z" 
                    className={`cursor-pointer transition-all duration-300 ${zonaActiva === 'Grada' ? 'fill-pink-500' : 'fill-gray-400 hover:fill-pink-300'}`}
                    onClick={() => onZonaSelect('Grada')}
                />
                <text x="400" y="345" textAnchor="middle" className="pointer-events-none font-black uppercase text-[12px]">Gradas</text>
            </svg>
        </div>
    );
}