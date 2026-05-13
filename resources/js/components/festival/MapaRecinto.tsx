import React from 'react';

interface Props {
    onZonaSelect: (zona: string) => void;
    zonaActiva: string | null;
}

export default function MapaRecinto({ onZonaSelect, zonaActiva }: Props) {
    return (
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
    );
}